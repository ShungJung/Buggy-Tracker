use std::collections::HashMap;
use std::sync::MutexGuard;
use serde_json::{Value};
use crate::{LocalDatabase, MAIN_DATABASE};

pub struct Entry {}

impl Entry {
    pub fn get_database() -> MutexGuard<'static, LocalDatabase> {
        MAIN_DATABASE.get().lock().unwrap()
    }
    pub fn set_all(data: HashMap<String, Value>) {
        MAIN_DATABASE.get().lock().unwrap().set_all(data);
    }
}