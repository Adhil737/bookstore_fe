import React from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Contacts = () => {
  return (
    <>
      <div className="contact-page-bg overflow-x-hidden" >
        <Header />
        <div>
          <h1 className="text-center text-white mt-4 font-bold text-4xl">
            Contacts
          </h1>
          <p className="text-white overflow-hidden mx-5 lg:m-24 mt-5 text-center leading-7">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
            cumque molestias quidem commodi sapiente explicabo veritatis
            numquam. Ab libero sunt eligendi in ipsum, commodi nam, dicta
            corrupti ea ipsam qui. Soluta debitis aliquam harum ipsam, nisi,
            veritatis aperiam quas inventore a fugit numquam odio explicabo
            cumque sint ullam velit reiciendis reprehenderit repellendus.
            Necessitatibus voluptatum sunt consectetur dignissimos, iusto natus
            delectus. Expedita numquam earum sed corrupti perspiciatis, quam
            saepe tenetur maxime tempora beatae, veritatis magnam. Iste dolore
            repellat consequatur cupiditate! Maxime consequatur quidem,
            blanditiis sint impedit corrupti soluta sunt placeat ad. Vel
            voluptatem illum saepe officiis. Perferendis facere repellat,
            veritatis repudiandae, vero natus, consectetur animi qui velit
            dolores nihil porro? Voluptatum laudantium voluptas unde incidunt
            vitae debitis molestias fugit consequuntur repudiandae!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 justify-around items-center mt-5">
          <div className="flex text-white items-center gap-2">
            <h1 className="contact-icons text-2xl">
              <FontAwesomeIcon icon={faLocationDot} />
            </h1>
            <h1>
              123 Main Street, Apt 4B, <br /> Anytown, CA 91234
            </h1>
          </div>
          <div className="flex text-white items-center gap-2">
            <h1 className="contact-icons text-2xl">
              <FontAwesomeIcon icon={faPhone} />
            </h1>
            <h1>+91 9874561230</h1>
          </div>
          <div className="flex text-white items-center gap-2">
            <h1 className="contact-icons text-2xl">
              <FontAwesomeIcon icon={faEnvelope} />
            </h1>
            <h1>mybookstore@gmail.com</h1>
          </div>
        </div>
        {/* contact-box & Map */}
        <div className="flex w-full flex-col lg:flex-row mt-6  text-white">
          {/* Left Section - Contact Form */}
          <div className="contact-inbox-section leading-7 mx-4 mb-3 card bg-base-300 rounded-2xl p-8 grow flex flex-col items-center  shadow-lg">
            <h1 className="font-bold text-2xl mb-6 text-center">
              Send Me a Message
            </h1>

            <input
              type="text"
              placeholder="Your Name"
              className="input text-white border border-gray-500 rounded-2xl w-80 text-center mb-4 bg-transparent placeholder-gray-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="input text-white border border-gray-500 rounded-2xl w-80 text-center mb-4 bg-transparent placeholder-gray-400"
            />

            <textarea
              placeholder="Your Message"
              className="textarea border border-gray-500 rounded-2xl w-80 h-28 text-white bg-transparent placeholder-gray-400 text-center mb-4"
            ></textarea>

            <button className="btn subscribe-button text-white cursor-pointer rounded-2xl w-40 mt-2">
              Send
            </button>
          </div>

          {/* for adding space between two components */}
          <div className="divider lg:divider-horizontal text-gray-400"></div>

          {/* For-Map */}
          <div className="card bg-base-300 rounded-2xl p-8 grow flex items-center justify-center ">
            <iframe
              title="Google Map - Sarathy Moideen Junction"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.5320942415424!2d76.64055641077788!3d8.923016090601596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e2cabdac6295%3A0x3a40e867d43eb14!2sSarathy-Moideen%20Jct%20Rd%2C%20Kilikkollur%2C%20Chandanathope%2C%20Kottamkara%2C%20Kerala%20691014!5e0!3m2!1sml!2sin!4v1760252345436!5m2!1sml!2sin"
              width="100%"
              height="400"
              style={{
                border: 0,
                borderRadius: "16px",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
