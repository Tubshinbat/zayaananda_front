"use client";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios-base";
import { useBookingContext } from "context/bookingContext";
import { getBanks } from "lib/payment";
import { toastControl } from "lib/toastControl";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "context/authContext";
import { usePayContext } from "context/payContext";
import { useNotificationContext } from "context/notificationContext";

const PayModule = (props) => {
  const { visible, setVisible, checkPayment, isPaid, invoice } =
    usePayContext();
  const { contentLoad } = useNotificationContext();
  const [banks, setBanks] = useState([]);
  const [acitveTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(contentLoad);

  useEffect(() => {
    setLoading(contentLoad);
  }, [contentLoad]);

  useEffect(() => {
    const fetchData = async () => {
      const { banks } = await getBanks();
      setBanks(banks);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!invoice) {
      if (visible === true) {
        setTimeout(() => {
          paymentCheck();
        }, 1000 * 18);
      }
    }
  }, [visible]);

  const paymentCheck = () => {
    setLoading(true);
    if (props.invoice) {
      checkPayment(props.invoice.sender_invoice_no);
    }
    if (invoice) {
      checkPayment(invoice.sender_invoice_no);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isPaid == true) {
      toastControl("success", "Гүйлгээ амжилттай хийгдлээ");
      setLoading(false);
    }
  }, [isPaid]);

  return (
    <>
      <div
        className={`modal-root ${
          visible === false ? "displayNone" : "displayOn"
        }`}
      >
        <div className="pay-modal-mask" onClick={() => setVisible(false)}></div>
        <div className="pay-modal-wrap pay-modal-centered">
          <div className="payModal">
            <div tabindex="0" aria-hidden="true"></div>
            <div className="payModal-content">
              <div className="payModal-body">
                <button
                  className="close"
                  type="button"
                  onClick={() => setVisible(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="modal-body">
                  {loading === true && (
                    <div className="loader-box">
                      <div class="loader">Loading...</div>
                    </div>
                  )}
                  <div className="modal-header">
                    <div className="left-section">
                      <div className="modal-title">
                        <h3> Дансаар эсвэл Qpay ашиглах </h3>
                        <div className="modal-sub-title">
                          Аль ч банкны аппликейшн ашиглан уншуулж болно.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-content">
                    <div className="qpay">
                      <h5>QR код уншуулах</h5>
                      {props.qpay && (
                        <img
                          src={`data:image/png;base64,${props.qpay.qr_image}`}
                        />
                      )}
                      <button
                        className="qpay-btn"
                        onClick={() => paymentCheck()}
                      >
                        Төлбөр шалгах{" "}
                      </button>
                    </div>
                    <div className="banks">
                      <h5>Дансаар шилжүүлэх</h5>
                      <div className="banks-header">
                        {banks &&
                          banks.map((bank, index) => (
                            <div
                              className={`tab-choise ${
                                acitveTab === index && "active"
                              }`}
                              onClick={() => setActiveTab(index)}
                            >
                              {bank.bankName}
                            </div>
                          ))}
                      </div>
                      <div className="bank-invoice">
                        <div className="item">
                          <div className="sub"> Хүлээн авах данс</div>
                          <div className="typography">
                            <span>
                              {banks &&
                                banks[acitveTab] &&
                                banks[acitveTab].bankAccount}
                            </span>
                            <button
                              onClick={() => {
                                toastControl("success", "Хуулагдлаа");
                                navigator.clipboard.writeText(
                                  banks &&
                                    banks[acitveTab] &&
                                    banks[acitveTab].bankAccount
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                          </div>
                        </div>
                        <div className="item">
                          <div className="sub"> Хүлээн авагч</div>
                          <div className="typography">
                            <span>
                              {banks &&
                                banks[acitveTab] &&
                                banks[acitveTab].accountName}{" "}
                            </span>
                            <button
                              onClick={() => {
                                toastControl("success", "Хуулагдлаа");
                                navigator.clipboard.writeText(
                                  banks &&
                                    banks[acitveTab] &&
                                    banks[acitveTab].accountName
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                          </div>
                        </div>
                        <div className="item">
                          <div className="sub"> Захиалгын дүн</div>
                          <div className="typography">
                            <span>{props.invoice && props.invoice.amount}</span>
                            <button
                              onClick={() => {
                                toastControl("success", "Хуулагдлаа");
                                navigator.clipboard.writeText(
                                  props.invoice && props.invoice.amount
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                          </div>
                        </div>
                        <div className="item">
                          <div className="sub"> Гүйлгээний утга</div>
                          <div className="typography">
                            <span>
                              {props.invoice && props.invoice.sender_invoice_no}
                            </span>
                            <button
                              onClick={() => {
                                toastControl("success", "Хуулагдлаа");
                                navigator.clipboard.writeText(
                                  props.invoice &&
                                    props.invoice.sender_invoice_no
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="alert alert-warning qpay-info">
                    Банкны дансаар шилжүүлсэн бол ажлын өдрүүдэд шалган
                    баталгаажуулах болно <br />
                    <br /> <strong> Qpay - ээр </strong>Төлбөрөө төлсөн бол
                    "ТӨЛБӨР ШАЛГАХ" товч дээр дарна уу. Жич: Төлсөн ч төлөөгүй
                    гэсэн хариу өгч байвал дахин шалгаарай.
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="payModal-content">
              <div className="payModelHeader">
                <div className="payChoise" onClick={() => setVisible("bank")}>
                  Банкаар шилжүүлэх
                </div>
                <div className="payChoise" onClick={() => setVisible("qpay")}>
                  Qpay - ээр төлөх
                </div>
                <div className="payment-box">
                  <ul className="bankAccounts">
                    {banks &&
                      banks.map((bank) => (
                        <div className="bank-item">
                          <div className="bankName"> {bank.bankName}</div>
                          <div className="bankAccount"> {bank.bankAccount}</div>
                          <div className="accountName"> {bank.accountName}</div>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PayModule;
