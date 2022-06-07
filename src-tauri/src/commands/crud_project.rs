use std::collections::HashMap;
use std::fs::{create_dir_all, write};
use serde::{Deserialize, Serialize};
use tauri::api::file::read_string;
use crate::AppState;
use super::crud_issue::{Issue, read_issue};
use super::util::generate_id;

const DATABASEFOLDER: &str = "DATABASE";

#[derive(Serialize, Deserialize)]
pub struct Project{
    pub name: String,
    pub issues: HashMap<String, Issue>,
}

#[tauri::command]
pub fn create_project(state: tauri::State<AppState>, name: String){
    let mut projects = read_project(state.clone());

    projects.insert(
        generate_id(projects.len() as u64),
        Project{
            name,
            issues: HashMap::new(),
        });

    let projects_json = serde_json::to_string(&projects)
        .ok()
        .expect("Unable to write file");

    let database_path = state.app_dir.join(DATABASEFOLDER);

    if !database_path.is_dir() {
        create_dir_all(&database_path).expect("Damn cannot create the dir");
    }

    write(database_path.join("data.json"), projects_json)
        .ok()
        .expect("Unable to write file");
}

#[tauri::command]
pub fn read_project(state: tauri::State<AppState>) -> HashMap<String, Project>{
    let database_path = state.app_dir.join(DATABASEFOLDER);

    if !database_path.is_dir() {
        create_dir_all(&database_path).expect("Damn cannot create the dir");
    }

    let file = read_string(database_path.join("data.json"))
        .ok();

    match file {
        Some(f) => {
            let projects: HashMap<String, Project> = serde_json::from_str(&f)
                .ok()
                .expect("Unable to read file");

            return projects;
        }
        None => {
            let contents = "{}";

            write(database_path.join("data.json"), contents)
                .ok()
                .expect("Unable to write file");

            return HashMap::new();
        }
    }
}

#[tauri::command]
pub fn update_project(state: tauri::State<AppState>, name: String, project_id: String){
    let mut projects = read_project(state.clone());

    match projects.get_mut(&project_id) {
        Some(p) => {
            *p = Project{
                name,
                issues: read_issue(state.clone(), project_id),
            };
        }
        None => {
            println!("Project not found");
        }
    }

    let projects_json = serde_json::to_string(&projects)
        .ok()
        .expect("Unable to write file");

    let database_path = state.app_dir.join(DATABASEFOLDER);

    if !database_path.is_dir() {
        create_dir_all(&database_path).expect("Damn cannot create the dir");
    }

    write(database_path.join("data.json"), projects_json)
        .ok()
        .expect("Unable to write file");
}

#[tauri::command]
pub fn delete_project(state: tauri::State<AppState>, project_id: String){
    let mut projects = read_project(state.clone());

    projects.remove(&project_id);

    let projects_json = serde_json::to_string(&projects)
        .ok()
        .expect("Unable to write file");

    let database_path = state.app_dir.join(DATABASEFOLDER);

    if !database_path.is_dir() {
        create_dir_all(&database_path).expect("Damn cannot create the dir");
    }

    write(database_path.join("data.json"), projects_json)
        .ok()
        .expect("Unable to write file");
}   