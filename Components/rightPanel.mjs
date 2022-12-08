export const rightPanel =
    `
    <div class="right-panel">
        <div class="right-panel-top">
            <div class="right-panel-top-white-div">
                <div class="learning-resources-header-div">
                    <h2 class="learning-resources-header">Teacher resources</h2>
                    <i id="info-icon" class="material-symbols-outlined">info</i>
                </div>
                <ul>
                    <li class="item-learning-resources">
                        <a href="">student success center</a>
                    </li>
                    <li class="item-learning-resources">
                        <a href="">Concordia Library</a>
                    </li>
                    <li class="item-learning-resources">
                        <a href="">Upcoming events</a>
                    </li>
                    <li class="item-learning-resources">
                        <a href="">Get Office 365</a>
                    </li>
                    <li class="item-learning-resources">
                        <a href="">Concordia financial help</a>
                    </li>
                    <li class="item-learning-resources">
                        <a href="">Code of Academic conduct</a>
                    </li>
                    <li class="item-learning-resources">
                        <a href="">Concordia Mental Health</a>
                    </li>

                </ul>
            </div>
        </div>
        <div class="right-panel-bottom">
        <div id="container">
      <div id="header">
        <div id="monthDisplay"></div>
        <div>
          <button id="backButton">Previous</button>
          <button id="nextButton">Next</button>
        </div>
      </div>

      <div id="weekdays">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      <div id="calendar"></div>
    </div>

    <div id="newEventModal">
      <h2>New Task</h2>

      <input id="eventTitleInput" placeholder="Event Title" />

      <button id="saveButton">Save</button>
      <button id="cancelButton">Cancel</button>
    </div>

    <div id="deleteEventModal">
      <h2>Current Task</h2>

      <p id="eventText"></p>

      <button id="deleteButton">Delete</button>
      <button id="closeButton">Close</button>
    </div>

    <div id="modalBackDrop"></div>
        </div>
    </div>
    `;
