"use client";

import {
  faArrowLeft,
  faEye,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ shareUrl = null, title = null }) => {
  return (
    <>
      <div className="share-box ">
        <FontAwesomeIcon icon={faShareAlt} />

        <ul>
          <li>
            <a
              className="facebook"
              href={`http://www.facebook.com/share.php?u=${shareUrl}`}
              target="popup"
            >
              facebook
            </a>
          </li>
          <li>
            <a
              className="twitter"
              href={`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`}
              target="popup"
            >
              Twitter
            </a>
          </li>

          <li>
            <a
              className="linkedin"
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
              target="popup"
            >
              linkedin
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
