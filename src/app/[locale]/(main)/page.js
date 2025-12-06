import Card from "@/components/Shared/Card/Card";
import Carousel from "@/components/Shared/Carousal/Carousal";
import Container from "@/components/Shared/Container/Container";
import { Hero } from "@/components/Shared/Hero/Hero";
import { Row, Col } from "@/components/ui/Grid/Grid";

const items = [
  { name: "New York", image: "/banner.jpg" },
  { name: "Paris", image: "/banner.jpg" },
  { name: "Tokyo", image: "/banner.jpg" },
  { name: "London", image: "/banner.jpg" },
  { name: "Sydney", image: "/banner.jpg" },
  { name: "Rome", image: "/banner.jpg" },
]
export default function Home() {
  return (
    <>
      <Hero />
      <Carousel items={items} />
      <Container>
        <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>

        <Row gap={4} cols={1} md={3} lg={5}>

          {/* Just repeat your cards. They will auto-flow into the grid. */}
          {/* Ensure span is 1, so it takes up 1 slot in the 5-slot grid */}

          <Col span={1}><Card title="Item 1" /></Col>
          <Col span={1}><Card title="Item 2" /></Col>
          <Col span={1}><Card title="Item 3" /></Col>
          <Col span={1}><Card title="Item 4" /></Col>
          <Col span={1}><Card title="Item 5" /></Col>

          <Col span={1}><Card title="Item 6" /></Col> {/* Will wrap to next line automatically */}

        </Row>
      </Container>
    </>
  );
}
