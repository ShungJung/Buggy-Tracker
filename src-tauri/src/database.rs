use std::collections::HashMap;
use std::fs::{create_dir_all, write};
use std::path::PathBuf;
use serde_json::Value;
use tauri::api::file::read_string;

pub struct LocalDatabase {
    pub data: HashMap<String, Value>,
    pub file_path: PathBuf,
}

impl LocalDatabase {
    pub fn init(&mut self) {
        let file_path: &PathBuf = &self.file_path;
        match read_string(&file_path) {
            Ok(s) => match serde_json::from_str(&s) {
                Ok(c) => {
                    self.data = c;
                }
                Err(e) => {
                    // TODO: Show error message in FE
                    println!("{}", e.to_string());
                    self.data = HashMap::new();
                    self.save();
                }
            },
            Err(..) => {
                self.data = HashMap::new();
                self.save();
            }
        };
    }
    pub fn get_all(&self) -> &HashMap<String, Value> {
        &self.data
    }
    pub fn get_all_mut(&mut self) -> &mut HashMap<String, Value> {
        &mut self.data
    }
    pub fn set_all(&mut self, data: HashMap<String, Value>) {
        self.data = data;
        self.save();
    }
    pub fn save(&self) {
        let data = &self.data;
        let file_path = &self.file_path;
        match create_dir_all(&file_path.parent().unwrap()) {
            Ok(()) => {}
            Err(e) => {
                // TODO: Show error message in FE
                println!("{}", e);
            }
        }

        match write(&file_path, serde_json::to_string(&data).unwrap()) {
            Ok(()) => {}
            Err(e) => {
                // TODO: Show error message in FE
                println!("{}", e);
            }
        }
    }
}