"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  value?: string;
}

export function AccordionCard({
  title,
  subtitle,
  children,
  defaultOpen = false,
  className,
  value = "item",
}: AccordionCardProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className={`${className}`}
    >
      <AccordionItem value={value} className="border-0">
        <Card className="px-5 bg-white border border-gray-100 shadow-none">
          <AccordionTrigger className="hover:no-underline p-6">
            <h3 className="text-lg font-semibold">{title}</h3>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="p">
                {subtitle && (
                  <p className="text-sm text-[#8ECAE6]">{subtitle}</p>
                )}
                <div className="mt-4">
                {children || (
                  <p className="text-sm text-muted-foreground">
                    No content available
                  </p>
                )}
                </div>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
