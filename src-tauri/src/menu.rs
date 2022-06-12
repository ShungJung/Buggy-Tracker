// use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};

// pub fn generate_menu() -> Menu {
//     let quit = CustomMenuItem::new("quit".to_string(), "Quit");
//     let close = CustomMenuItem::new("close".to_string(), "Close");
//     let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
//     let menu = Menu::new()
//         .add_native_item(MenuItem::Copy)
//         .add_item(CustomMenuItem::new("hide", "Hide"))
//         .add_submenu(submenu);

//     return menu;
// }

// pub fn menu_handler(event: WindowMenuEvent) {
//     match event.menu_item_id() {
//         "quit" => {
//             std::process::exit(0);
//         }
//         "hide" => {
//             event.window().close().unwrap();
//         }
//         _ => {}
//     }
// }