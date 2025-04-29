import React from "react";

const WhatsAppFloatButton = () => {
  const phoneNumber = "918072524935";
  const message = "Hi, I am interested in your products!";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        zIndex: 999,
      }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M12.004 2c5.514 0 9.996 4.482 9.996 10 0 5.523-4.483 10-10.004 10a9.91 9.91 0 0 1-5.137-1.415L2 22l1.478-5.004A9.946 9.946 0 0 1 2 12C2 6.482 6.486 2 12.004 2zm0-2C5.374 0 0 5.373 0 12c0 2.142.564 4.147 1.55 5.891L0 24l6.266-1.516A11.963 11.963 0 0 0 12.004 24c6.627 0 11.996-5.373 11.996-12S18.63 0 12.004 0zM7.832 6.888c-.207-.466-.426-.475-.628-.483l-.533-.01c-.184 0-.48.069-.731.345-.25.276-.961.94-.961 2.29 0 1.351.983 2.654 1.12 2.835.138.182 1.946 3.115 4.785 4.245 2.837 1.131 2.837.756 3.347.707.51-.05 1.645-.672 1.877-1.32.232-.648.232-1.201.162-1.32-.07-.119-.257-.188-.533-.33-.277-.142-1.645-.811-1.902-.902-.258-.092-.446-.138-.633.137-.188.275-.729.901-.893 1.086-.164.185-.34.207-.623.069-.283-.137-1.193-.439-2.27-1.397-.839-.747-1.403-1.667-1.566-1.946-.163-.28-.018-.432.122-.569.126-.124.283-.32.424-.48.14-.162.187-.275.282-.457.094-.183.047-.345-.024-.482-.07-.138-.624-1.511-.869-2.078z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloatButton;
