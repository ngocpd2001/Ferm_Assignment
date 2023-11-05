import React from "react";
import {
  Container,
  Icon,
  Select,
  Textarea,
  TextInput,
} from "react-materialize";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <div
        style={{
          backgroundColor: "rgb(255,182,193)",
          borderRadius: "15px",
          borderRadius: "15px 15px",
          borderRadius: "15px 15px 15px ",
          borderRadius: "15px 15px 15px 15px",
        }}
      >
        <h1 style={{ paddingLeft: "20px", paddingTop: "10px" }}>Contact Us</h1>
        <h4 style={{ paddingLeft: "20px" }}>
          Feel free to get in touch with us using the contact form below.
        </h4>
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "30px", padding: "20px" }}
        >
          <TextInput id="TextInput-38" label="Your Name" />
          <TextInput email id="TextInput-41" label="Email" validate />
          <TextInput id="TextInput-38" label="Message" />
          <Select
            id="Select-46"
            multiple={false}
            onChange={function noRefCheck() {}}
            value=""
          >
            <option disabled value="">
              Choose your favourite film
            </option>
            <option value="1">Business Propolsal</option>
            <option value="2">What is Wrong,Secretary Kim?</option>
            <option value="3">Forecasting love and Weather</option>
            <option value="4">Crash landing on you</option>
            <option value="5">Itaewon class</option>
            <option value="6">Parasite</option>
            <option value="7">The Penthouse: War in Life</option>
            <option value="8">Squid Games</option>
            <option value="9">Twenty-Five Twenty-one</option>
          </Select>
          <Textarea
            icon={<Icon>mode_edit</Icon>}
            id="Textarea-28"
            label="Your Content"
          />
          <div style={{ textAlign: "right" }}>
            {/* <button
              style={{
                backgroundColor: "rgb(84,255,159)",
              }}
            >
              Submit
            </button> */}
            <button
              style={{
                color: "#fff",
                padding: "10px",
                background: "#7d2ae8",
                "border-radius": "5px",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
