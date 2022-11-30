export const overlayPanel =
    `
    <div id="overlay-container">
        <div id="overlay-panel">
            <div id="overlay-panel-header">
                <div id="overlay-navbar">
                    <div id="overlay-nav-item-assignments" class="overlay-nav-item">Assignments</div>
                    <div id="overlay-nav-item-announcements" class="overlay-nav-item">Annoucements</div>
                    <div id="overlay-nav-item-grades" class="overlay-nav-item">Grades</div>
                    <div id="overlay-nav-item-files" class="overlay-nav-item">Files</div>
                </div>
                </select>
                <i class="material-symbols-outlined icons-md-45 close-btn">close</i>
            </div>
            <div id="overlay-assignment-options">
                <div id="overlay-new-assignment-btn">
                    New Assignment
                    <i class="material-symbols-outlined btn-icon">post_add</i>
                </div>
                <div id="existing-assignment">
                    list of existing assignments
                </div>

            </div>
            <div id="assignments-layout" class="overlay-panel-content">
                <form action="">
                    <label for="assignment-title" required>Assignment title:</label>
                    <input id="assignment-title" type="text">
                    <label for="assignment-description">Description:</label>
                    <textarea name="assignment-description" id="assignment-description" cols="30" rows="10"></textarea>
                    <label for="assignment-files">Attach file:</label>
                    <input type="file" name="" id="assignment-files" multiple />
                    <label for="assignment-weight">Weight out of 100%:</label>
                    <input type="number" name="" id="assignment-weight" value="0" required>
                    <label for="assignment-due-date">Due date:</label>
                    <input type="date" name="" id="assignment-due-date" required>
                    <div class="row-display">
                        <label for="assignment-visible">Visible to students: </label>
                        <input type="checkbox" name="" id="assignment-visible">
                    </div>
                    <input id="add-assignment-btn" type="submit" value="Add assignment">
                </form>
            </div>
            <div id="announcements-layout" class="overlay-panel-content">
                <label for="announcement-subject">Subject:</label>
                <input id="announcement-subject" type="text">
                <label for="announcement-description">Description:</label>
                <textarea name="announcement-description" id="" cols="30" rows="10"></textarea>
                <input id="add-announcement-btn" type="submit" value="Add announcement">
                <div id="overlay-announcement-list" class="announcement-list">

                </div>

            </div>
            <div id="grades-layout" class="overlay-panel-content">
                <select name="" id="assessment-list">

                </select>
                <label for="assessment-weight">Assessment weight</label>
                <input type="number" name="" value="10.0" id="assessment-weight" disabled>
                <label for="">out of 100</label>
                <ul id="student-list-and-grades">

                </ul>
            </div>
            <div id="new-file-layout" class="overlay-panel-content">
                <label for="new-file">New file:</label>
                <input type="file" name="" id="new-file">
                <label for="">Attach to Week: </label>
                <input type="date" name="" id="">
                </select>
            </div>

        </div>
    </div>
    `
