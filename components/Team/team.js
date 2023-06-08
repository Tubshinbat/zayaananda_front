"use client";
import { useState } from "react";
import styles from "styles/Team.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";

const Team = ({ memberData, boolenPop = true }) => {
  const [pop, setPop] = useState(false);

  const handleClick = () => {
    if (boolenPop) {
      setPop((bf) => (bf === true ? false : true));
    }
  };

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className={styles.Team} onClick={handleClick}>
          <div className={styles.UserImg}>
            <img src={base.cdnUrl + "/" + memberData.picture} />
          </div>
          <p>
            {memberData.lastName} {memberData.firstName}
          </p>
          <span>{memberData.position}</span>
        </div>
      </div>
      <div
        className={`${styles.BlackBg} ${
          pop === true ? styles.DisplayFlex : styles.DisplayOff
        }`}
      >
        <div
          className={`${styles.Window} animate__animated animate__fadeIn ${
            pop === true ? styles.DisplayOn : styles.DisplayOff
          }`}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.CloseIcon}
            onClick={handleClick}
          />
          <img
            src={base.cdnUrl + "/" + memberData.picture}
            className={styles.WindowImg}
          />
          <div className={styles.Info}>
            <h6>
              {" "}
              {memberData.lastName} {memberData.firstName}
            </h6>
            <span> {memberData.position} </span>
            <p dangerouslySetInnerHTML={{ __html: memberData.details }}></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
