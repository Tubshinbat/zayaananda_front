"use client";

export default ({ shareUrl = null, title = null }) => {
  return (
    <>
      <div className="share-box ">
        <i className="fa fa-share-alt" />
        <ul>
          <li>
            <a
              className="facebook"
              href={`http://www.facebook.com/share.php?u=${shareUrl}`}
              target="popup"
            >
              <i className="fa-brands fa-facebook-square" />
            </a>
          </li>
          <li>
            <a
              className="twitter"
              href={`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`}
              target="popup"
            >
              <i className="fa-brands fa-twitter-square" />
            </a>
          </li>

          <li>
            <a
              className="linkedin"
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
              target="popup"
            >
              <i className="fa-brands fa-linkedin" />
              <span />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
