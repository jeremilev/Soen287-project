import { cardWeekBlock } from "./cardWeekBlock.mjs";

var weekList = ``;
for (let i = 0; i < 16; i++) {
    weekList += cardWeekBlock;
}
console.log(weekList)
export const coursePage =
    `
    <div class="course-card">
                <div class="course-card-header">
                    <div class="course-name-breadcrumb-container">
                        <h1 id="course-name">Course name</h1>
                        <nav class="breadcrumb">
                            <ul>
                                <li>
                                    <a href="teacher-dashboard.html">My courses</a>
                                </li>
                                <li>
                                    <a href="">Course Name</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="course-buttons-container">
                        <div role="button" class="card-header-btn">
                            <i class="material-symbols-outlined icons-md-45 btn-icon">percent</i>
                        </div>

                        <div role="button" class="card-header-btn">
                            <i class="material-symbols-outlined btn-icon">post_add</i>
                        </div>
                        <div role="button" class="card-header-btn">
                            <i class="material-symbols-outlined btn-icon">campaign</i>
                        </div>
                    </div>
                </div>
                <div id="general-info-block" class="card-week-block">
                    <hr>
                    <div class="week-dates-div">
                        <h2 id="general-information-header" class="week-dates">General Information</h2>
                        <div role="button" class="card-header-btn">
                            <i class="material-symbols-outlined btn-icon">attach_file_add</i>
                        </div>
                    </div>
                    <h3 class="week-dates">Announcements</h3>
                    <h3 id="assessments-header" class="week-dates">Assessments</h3>

                </div>
                ${weekList}
            </div>
        </div>
    `