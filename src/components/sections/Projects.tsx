import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <section id="proyectos" className="relative scroll-mt-20 border-t border-cream/10 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          index="02"
          eyebrow="Portafolio"
          title={
            <>
              Trabajo <em>reciente</em>.
            </>
          }
          description="Algunos de los eventos que hemos transmitido en vivo. Dale play para verlos aquí mismo."
        />
        <ProjectsGallery projects={projects} />
      </div>
    </section>
  );
}
