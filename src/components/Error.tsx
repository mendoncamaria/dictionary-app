import type { JSX } from "react";

export const GetErrorMessage = ({ errorMessage }: { errorMessage: string }): JSX.Element => {
  return (
    <div className="showResults">
      <h3
        className="error-message"
        style={{ textAlign: 'center', marginTop: '50px' }}
      >
        {errorMessage}
      </h3>
    </div>
  );
};