use std::collections::HashMap;
use std::sync::MutexGuard;
use serde::{Deserialize, Serialize};
use serde_json::{from_value, to_value, Value};
use crate::commands::util::generate_id;
use crate::entries::entry::Entry;
use crate::entries::issue::Issue;
use crate::LocalDatabase;

#[derive(Serialize, Deserialize, Default)]
pub struct Project {
    pub name: String,
    pub issues: HashMap<String, Issue>,
}

impl Project {
    pub fn create(name: &String) {
        let mut database: MutexGuard<LocalDatabase> = Entry::get_database();
        let projects: &mut HashMap<String, Value> = database.get_all_mut();
        projects.insert(
            generate_id(projects.len() as u64),
            to_value(Project {
                name: name.to_string(),
                issues: HashMap::new(),
            }).unwrap_or_default(),
        );
        database.save();
    }
    pub fn get_all() -> HashMap<String, Value> {
        let database = Entry::get_database();
        database.get_all().clone()
    }
    pub fn get(project_id: &String) -> Project {
        let database = Entry::get_database();
        let projects: &HashMap<String, Value> = database.get_all();
        from_value(projects[project_id].clone()).unwrap_or_default()
    }
    pub fn update(name: &String, project_id: &String) {
        let mut database = Entry::get_database();
        let projects = database.get_all_mut();
        match projects.get_mut(project_id) {
            Some(p) => {
                // TODO: Find a way to see if the data returned by database can already be casted to Project
                let mut project: Project = from_value(p.clone()).unwrap_or_default();
                project.name = name.to_string();
                *p = to_value(project).unwrap_or_default();
            }
            None => {
                // TODO: Show error message in FE
                println!("Project not found");
            }
        }
        database.save();
    }
    pub fn delete(project_id: &String) {
        let mut database = Entry::get_database();
        let projects: &mut HashMap<String, Value> = database.get_all_mut();
        projects.remove(project_id);
        database.save();
    }
}
