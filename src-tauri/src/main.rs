#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::collections::HashMap;
use std::path::{PathBuf};
use std::sync::Mutex;
use state::LocalStorage;
use commands::crud_issue::{create_issue, delete_issue, get_issues, update_issue};
use commands::crud_project::{create_project, delete_project, get_projects, update_project};
//use menu::{generate_menu, menu_handler};
use crate::constants::constants::{DATABASE_FILENAME, DATABASE_FOLDERNAME};
use crate::database::LocalDatabase;

pub mod commands;
pub mod menu;
pub mod entries;
pub mod constants;
pub mod database;

pub static MAIN_DATABASE: LocalStorage<Mutex<LocalDatabase>> = LocalStorage::new();

fn main() {
    // Tauri initialization
    tauri::Builder::default()
        //.menu(generate_menu())
        //.on_menu_event(menu_handler)
        .invoke_handler(tauri::generate_handler![
            create_issue,
            get_issues,
            update_issue,
            delete_issue,
            create_project,
            get_projects,
            update_project,
            delete_project
        ])
        .setup(|app| {
            let app_dir: PathBuf = app.path_resolver().app_dir().unwrap();

            // Initialize the database
            initialize_main_database(app_dir);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Error while running Buggy-Tracker");
}

// TODO: Move this function to another file?
fn initialize_main_database(app_dir: PathBuf) {
    MAIN_DATABASE.set(move || {
        let mut database = LocalDatabase {
            data: HashMap::new(),
            file_path: app_dir.join(DATABASE_FOLDERNAME).join(DATABASE_FILENAME),
        };
        database.init();
        Mutex::new(database)
    });
}
