use std::collections::HashMap;
use serde_json::Value;
use crate::entries::project::Project;

#[tauri::command]
pub fn create_project(name: String) {
    Project::create(&name);
}

#[tauri::command]
pub fn get_projects() -> HashMap<String, Value> {
    // TODO: Test if can return reference?
    Project::get_all()
}

#[tauri::command]
pub fn update_project(name: String, project_id: String) {
    Project::update(&name, &project_id);
}

#[tauri::command]
pub fn delete_project(project_id: String) {
    Project::delete(&project_id);
}