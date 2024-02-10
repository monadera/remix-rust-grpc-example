pub const FILE_DESCRIPTOR_SET: &[u8] = tonic::include_file_descriptor_set!("trading_descriptor");

pub mod proto {
    pub mod refdata {
        tonic::include_proto!("refdata");
    }
}