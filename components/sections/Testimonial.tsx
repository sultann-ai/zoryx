import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { Sticker } from "@/components/ui/Sticker";
import { proof, testimonials } from "@/content/site";
import { isPlaceholderImage } from "@/lib/images";

const MAX_STICKERS = 3;

// Placement, tilt, shape and colour for up to three stickers around the photo.
const stickerStyles = [
  { rotation: -6, color: "sunflower", shape: "scalloped", position: "-top-6 -left-2 md:-left-8" },
  { rotation: 4, color: "sky", shape: "square", position: "-top-4 -right-2 md:-right-8" },
  { rotation: -3, color: "lime", shape: "circle", position: "-bottom-6 -right-2 md:-right-8" },
] as const;

export function Testimonial() {
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  const stickers = proof.slice(0, MAX_STICKERS);
  const hasPhoto = !isPlaceholderImage(testimonial.photo);

  return (
    <Section background="green" deferRender={730}>
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
        <div className="relative mx-auto w-full max-w-xs lg:mx-0">
          <ImageFrame
            alt={testimonial.name}
            src={hasPhoto ? testimonial.photo : undefined}
            placeholder={testimonial.photo}
            aspect="4 / 5"
          />
          {stickers.map((item, index) => {
            const style = stickerStyles[index];
            return (
              <div key={item.label} className={`absolute ${style.position}`}>
                <Sticker
                  value={item.label}
                  rotation={style.rotation}
                  color={style.color}
                  shape={style.shape}
                />
              </div>
            );
          })}
        </div>

        <figure>
          <blockquote>
            <h3 className="text-quote text-cream">{testimonial.quote}</h3>
          </blockquote>
          <figcaption className="mt-8">
            <p className="text-h3 text-cream">{testimonial.name}</p>
            <p className="text-body mt-1 text-cream/85">
              {testimonial.role} · {testimonial.business}
            </p>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
