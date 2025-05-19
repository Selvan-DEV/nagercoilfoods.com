import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order using the tracking number provided in your shipping confirmation email. Please visit the carrier's website and enter the tracking number to see the current status of your shipment.",
    },
    {
      question: "What is the minimum order value?",
      answer:
        "The minimum order value is Rs.150. We offer free shipping on orders above Rs.1000.",
    },
    {
      question: "How can I cancel my order?",
      answer:
        "You can cancel your order within 2 hours of placing it. Please contact our customer service team at support@nagercoilfoods.com or call us at +91 807 252 4935 to request a cancellation.",
    },
    {
      question: "How long will it take to reach my home?",
      answer:
        "Delivery times vary depending on your location. Typically, orders are delivered within 3-5 business days. You can check the estimated delivery time during checkout.",
    },
    {
      question: "Do you ship outside Tamil Nadu?",
      answer:
        "Yes, we ship our banana chips all over India! We are working on expanding our international shipping options. Stay tuned for updates!",
    },
    {
      question: "What types of banana chips do you offer?",
      answer:
        "We offer a variety of banana chips, including salted, pepper, jaggery, and masala flavors. We also have organic options available.",
    },
    {
      question: "How should I store my banana chips?",
      answer:
        "To maintain freshness, store your banana chips in an airtight container at room temperature, away from direct sunlight and moisture.",
    },
    {
      question: "Do you offer bulk discounts for events?",
      answer:
        "Yes, we offer bulk discounts for events and parties. Please contact our sales team at sales@bananachips.com for more information.",
    },
  ];

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          FAQs about Banana Chips Online Delivery
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            defaultExpanded={false}
            style={{ margin: "8px 0" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant={isMobile ? "subtitle2" : "subtitle1"}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
