import React from "react";

function Footer() {
  return (
    <footer className="bg-primary text-white  bg-black pb-1">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-uppercase font-weight-bold">Cinema</h3>
            <p className="my-1">Created by Phan Danh Ngọc.</p>
            <p className="my-1">Student ID: SE161613</p>
          </div>
          <div className="col-md-8">
            <h3 className="text-uppercase font-weight-bold">Contact Us</h3>
            <ul className="list-unstyled">
              <li>
                <i
                  className="fas fa-map-marker-alt mr-2"
                  style={{ paddingRight: "20px" }}
                ></i>
                Lot E2a-7, Road D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi
                Minh City 700000
              </li>
              <li>
                <i
                  className="fas fa-phone mr-2"
                  style={{ paddingRight: "20px" }}
                ></i>
                (123) 456-7890
              </li>
              <li>
                <i
                  className="fas fa-envelope mr-2"
                  style={{ paddingRight: "20px" }}
                ></i>
                ngocpdse161613@fpt.edu.vn
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-1">Copyright &copy; 2023 Cinema</p>
      </div>
    </footer>
  );
}

export default Footer;
