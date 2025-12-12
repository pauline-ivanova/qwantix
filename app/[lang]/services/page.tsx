import { getAllServices } from "@/lib/mdx";
import Link from "next/link";

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <section>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
