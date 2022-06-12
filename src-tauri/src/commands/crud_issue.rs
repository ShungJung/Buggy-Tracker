use std::collections::HashMap;
use crate::entries::issue::Issue;

#[tauri::command]
pub fn create_issue(title: String, description: String, project_id: String) {
    Issue::create(&title, &description, &project_id);
}

#[tauri::command]
pub fn get_issues(project_id: String) -> HashMap<String, Issue> {
    // TODO: Test if can return reference?
    Issue::get_all(&project_id)
}

#[tauri::command]
pub fn update_issue(title: String, description: String, issue_id: String, project_id: String) {
    Issue::update(&title, &description, &issue_id, &project_id);
}

#[tauri::command]
pub fn delete_issue(issue_id: String, project_id: String) {
    Issue::delete(&issue_id, &project_id);
}    
