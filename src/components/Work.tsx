import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  const projects = [
    {
      id: 1,
      number: "01",
      name: "SchemeSeva",
      category: "Full Stack Web Application",
      tools: "React, Node.js, Express, MongoDB",
      description:
        "Government scheme recommendation platform that helps users discover schemes based on eligibility and provides application guidance.",
      image: "/images/schemeseva.webp",
    },
    {
      id: 2,
      number: "02",
      name: "Automatic Text Summarization System",
      category: "NLP Application",
      tools: "Python, Flask, spaCy, TextRank",
      description:
        "Automatic text summarization system that generates concise summaries from large text documents using NLP techniques.",
      image: "/images/placeholder.webp",
    },
    {
      id: 3,
      number: "03",
      name: "YOLOv4 DeepSORT Object Tracking",
      category: "Computer Vision",
      tools: "Python, YOLOv4, DeepSORT, OpenCV",
      description:
        "Real-time multi-object tracking system using YOLOv4 for detection and DeepSORT for object tracking.",
      image: "/images/yolo-tracking.webp",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
