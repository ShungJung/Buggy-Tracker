use std::time::SystemTime;
use block_id::{Alphabet, BlockId};

pub fn generate_id(index: u64) -> String{
    let alphabet = Alphabet::alphanumeric();

    let seed = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_millis();

    let length = 8;

    let generator = BlockId::new(alphabet, seed, length);

    generator.encode_string(index)
}

