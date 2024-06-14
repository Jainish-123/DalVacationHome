import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

declare global {
  interface Window {
    bootstrap: any;
  }
}

export const Booking = () => {
  useEffect(() => {
    const modal = new window.bootstrap.Modal(
      document.getElementById("bookingModal")
    );

    const handleBookingButtonClick = () => {
      modal.show();
    };

    const bookingButton = document.getElementById("bookingButton");
    if (bookingButton) {
      bookingButton.addEventListener("click", handleBookingButtonClick);
    }

    return () => {
      if (bookingButton) {
        bookingButton.removeEventListener("click", handleBookingButtonClick);
      }
    };
  }, []);

  return (
    <div>
      <h1>Booking</h1>

      <button id="bookingButton" className="btn btn-primary">
        Book Now
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="bookingModal"
        tabIndex={-1}
        aria-labelledby="bookingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookingModalLabel">
                Booking Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={3}
                  ></textarea>
                </div>
              </form>
              <p>This is the booking form.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
