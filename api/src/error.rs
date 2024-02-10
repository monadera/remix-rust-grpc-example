use tonic::{Code, Status};
use tracing::error;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("other error")]
    Other(#[from] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for Status {
    fn from(err: Error) -> Self {
        match err {
            _ => {
                let error_message = err.to_string();
                error!(error_message, "internal error: {:?}", err);
                Self::new(Code::Internal, error_message)
            }
        }
    }
}
