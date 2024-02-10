use std::path::PathBuf;
use std::{env, fs};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
    let paths = fs::read_dir("./protos").unwrap();
    let models: Vec<_> = paths.flatten().map(|e| e.path()).collect();
    tonic_build::configure()
        .file_descriptor_set_path(out_dir.join("trading_descriptor.bin"))
        .compile(&models, &["protos"])
        .unwrap();
    Ok(())
}