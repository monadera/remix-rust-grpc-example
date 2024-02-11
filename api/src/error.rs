use tonic::{Code, Status};
use tracing::error;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("sql error")]
    Sqlx(#[from] sqlx::Error),
    #[error("other error")]
    Other(#[from] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for Status {
    fn from(err: Error) -> Self {
        match err {
            Error::Sqlx(sqlx::Error::RowNotFound) => {
                Self::new(Code::NotFound, "not found".to_string())
            }
            Error::Sqlx(sqlx::Error::Database(err)) => {
                let code = if err.is_check_violation() {
                    Code::InvalidArgument
                } else {
                    Code::Internal
                };
                Self::new(code, err.to_string())
            }
            _ => {
                let error_message = err.to_string();
                error!(error_message, "internal error: {:?}", err);
                Self::new(Code::Internal, error_message)
            }
        }
    }
}
