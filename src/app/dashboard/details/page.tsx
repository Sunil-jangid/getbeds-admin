import { AccordionCard } from "@/components/accordion-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HospitalSection = {
  id: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
};

const hospitalSections: HospitalSection[] = [
  {
    id: "general",
    title: "General",
    subtitle: "Basic hospital details and contact information",
  },
  {
    id: "vendorid",
    title: "Vendor IDs",
    subtitle: "Vendor ID",
  },
  {
    id: "managers",
    title: "Manager's Info",
    subtitle: "Manager details",
  },
  {
    id: "status",
    title: "Hospital Status",
    subtitle: "Hospital status",
  },
  {
    id: "contentverificiation",
    title: "Hospital Content Verification",
    subtitle: "Hospital content verification details",
  },
  {
    id: "settings",
    title: "Hospital Settings",
    subtitle: "Hospital settings",
  },
  {
    id: "payathospital",
    title: "Pay At Hospital Info",
    subtitle: "Pay at hospital details",
  },
  {
    id: "basicinfo",
    title: "Basic Hospital Info",
    subtitle: "Basic hospital details",
  },
  {
    id: "address",
    title: "Address Info",
    subtitle: "Hospital address",
  },
  {
    id: "contact",
    title: "Contact Info",
    subtitle: "Hospital contact details",
  },
  {
    id: "services",
    title: "Hospital Services",
    subtitle: "Hospital services",
  },
  {
    id: "policies",
    title: "Hospital Policies",
    subtitle: "Hospital policies",
  },
  {
    id: "payout",
    title: "Payout Condition",
    subtitle: "Payout condition details",
  },
  {
    id: "admin",
    title: "Admin",
    subtitle: "Admin details",
  },
  {
    id: "location",
    title: "Hospital Location Info",
    subtitle: "Hospital location details",
  },
];

const HospitalDetails = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <div className="mb-8 space-y-6">
          <div className="flex flex-row gap-2 items-end">
            <h1 className="text-xl font-semibold">Hospital Name : </h1>
            <p className="text-3xl font-bold text-[#8ECAE6]">
              Max Super Speciality Hospital
            </p>
          </div>
          <Select>
            <SelectTrigger className="p-10 border-0 bg-white rounded-lg">
              <SelectValue placeholder="Choose from the following list" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {hospitalSections.map((section) => (
                <SelectItem key={section.id} value={section.id} className="p-3">
                  {section.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {hospitalSections.map((section) => (
            <AccordionCard
              key={section.id}
              value={section.id}
              title={section.title}
              subtitle={section.subtitle}
              defaultOpen={section.id === "general"}
            >
              {section.content}
            </AccordionCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
