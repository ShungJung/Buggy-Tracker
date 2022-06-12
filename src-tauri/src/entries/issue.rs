use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use serde_json::{from_value, to_value, Value};
use crate::commands::util::generate_id;
use crate::entries::entry::Entry;
use crate::entries::project::Project;

#[derive(Serialize, Deserialize, Clone)]
pub struct Issue {
    pub title: String,
    pub description: String,
    pub priority: String,
    pub deadline: String,
}

impl Issue {
    pub fn create(title: &String, description: &String, priority: &String, deadline: &String, project_id: &String) {
        let mut database = Entry::get_database();
        let projects: &mut HashMap<String, Value> = database.get_all_mut();
        match projects.get_mut(project_id) {
            Some(p) => {
                // TODO: Find a way to see if the data returned by database can already be casted to Project
                let mut project: Project = from_value(p.clone()).unwrap_or_default();
                project.issues.insert(
                    generate_id(project.issues.len() as u64),
                    Issue {
                        title: title.to_string(),
                        description: description.to_string(),
                        priority: priority.to_string(),
                        deadline: deadline.to_string(),
                    },
                );
                *p = to_value(project).unwrap_or_default();
            }
            None => {}
        }
        database.save();
    }
    pub fn get_all(project_id: &String) -> HashMap<String, Issue> {
        let project = Project::get(project_id);
        project.issues
    }
    pub fn update(title: &String, description: &String, priority: &String, deadline: &String, issue_id: &String, project_id: &String) {
        let mut database = Entry::get_database();
        let projects = database.get_all_mut();
        match projects.get_mut(project_id) {
            Some(p) => {
                // TODO: Find a way to see if the data returned by database can already be casted to Project
                let mut project: Project = from_value(p.clone()).unwrap_or_default();
                match project.issues.get_mut(issue_id) {
                    Some(i) => {
                        i.title = title.to_string();
                        i.description = description.to_string();
                        i.priority = priority.to_string();
                        i.deadline = deadline.to_string();
                    }
                    None => {}
                }
                *p = to_value(project).unwrap_or_default();
            }
            None => {}
        }
        database.save();
    }
    pub fn delete(issue_id: &String, project: &String){
        let mut database = Entry::get_database();
        let projects: &mut HashMap<String, Value> = database.get_all_mut();
        match projects.get_mut(project) {
            Some(p) => {
                // TODO: Find a way to see if the data returned by database can already be casted to Project
                let mut project: Project = from_value(p.clone()).unwrap_or_default();
                project.issues.remove(issue_id);
                *p = to_value(project).unwrap_or_default();
            }
            None => {}
        }
        database.save();
    }
}