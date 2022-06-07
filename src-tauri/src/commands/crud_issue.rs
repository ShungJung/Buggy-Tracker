use std::collections::HashMap;
use std::fs::{create_dir_all, write};
use serde::{Deserialize, Serialize};
use crate::AppState;
use super::crud_project::{Project, read_project};
use super::util::generate_id;

const DATABASEFOLDER: &str = "DATABASE";

#[derive(Serialize, Deserialize, Clone)]
pub struct Issue{
    pub title: String,
    pub description: String,
}

#[tauri::command]
pub fn create_issue(state: tauri::State<AppState>, title: String, description: String, project_id: String){
    let mut projects = read_project(state.clone());

    let mut issues = read_issue(state.clone(), project_id.clone());

    issues.insert(
        generate_id(issues.len() as u64),
        Issue{
            title,
            description,
        });

    match projects.get_mut(&project_id) {
        Some(p) => {
            *p = Project{
                name: p.name.clone(),
                issues,
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
pub fn read_issue(state: tauri::State<AppState>, project_id: String) -> HashMap<String, Issue>{
    let projects = read_project(state);

    let issues: HashMap<String, Issue> = projects[&project_id].issues.clone();

    return issues;
}

#[tauri::command]
pub fn update_issue(state: tauri::State<AppState>, title: String, description: String, issue_id: String, project_id: String){
    let mut projects = read_project(state.clone());

    let mut issues = read_issue(state.clone(), project_id.clone());

    match issues.get_mut(&issue_id) {
        Some(i) => {
            *i = Issue{
                title,
                description,
            };
        }
        None => {
            println!("Project not found");
        }
    }

    match projects.get_mut(&project_id) {
        Some(p) => {
            *p = Project{
                name: p.name.clone(),
                issues,
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
pub fn delete_issue(state: tauri::State<AppState>, issue_id: String, project_id: String){
    let mut projects = read_project(state.clone());

    let mut issues = read_issue(state.clone(), project_id.clone());

    issues.remove(&issue_id);

    match projects.get_mut(&project_id) {
        Some(p) => {
            *p = Project{
                name: p.name.clone(),
                issues,
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
