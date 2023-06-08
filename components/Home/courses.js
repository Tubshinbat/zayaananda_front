import base from "lib/base";

const Courses = ({ courses }) => {
  return (
    <>
      <section className="homeCourse">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionTitle">
              <p className="sectionSub"> Zaya's Ananda</p>
              <h3 className="white">
                Манай <span> сургалтууд </span>
              </h3>
            </div>
            <a href="/course"> Бүх сургалтууд </a>
          </div>
          <div className="row course-list">
            {courses &&
              courses.map((course) => (
                <div className="col-xl-4 col-lg-6">
                  <div className="courseBox">
                    <a href={`/course/${course._id}`}>
                      <div className="courseImg">
                        <div className="courseType">
                          {course.type === "local" ? "Танхим" : "Онлайн"}
                        </div>
                        {course.pictures && course.pictures[0] && (
                          <img src={`${base.cdnUrl}/${course.pictures[0]}`} />
                        )}
                      </div>
                    </a>
                    <div className="courseTitle">
                      <a href={`/course/${course._id}`}>
                        <h4>{course.name}</h4>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
