export const supplementRelationshipGroups = [
  {
    category: "Omega-3",
    status: "alternative",
    label: "Mixed rotation",
    productIds: [
      "norsan-omega-3-capsules",
      "sunday-vegan-omega-3-epa-focus",
      "sunday-vegan-omega-3-dha-focus",
      "norsan-omega-3-total-lemon",
      "blueprint-omega-3",
    ],
    summary: "NORSAN fish-oil capsules are the default. The two Sunday Natural algae softgels are in rotation. NORSAN liquid oil and Blueprint algae omega-3 remain non-default alternatives. Full label servings are not automatically added together.",
  },
  {
    category: "Vitamin D3 + K2",
    status: "overlap",
    label: "Selected route with caution",
    productIds: [
      "sunday-vitamin-d3-k2-mk7-2500-iu-100mcg",
      "sunday-vitamin-d3-k2-mk7-20000-iu-200mcg",
      "altapharma-d3-k2-drops",
      "blueprint-essential-capsules",
    ],
    summary: "The Sunday Natural 2,500 IU + 100 µg drops are Tilman's selected standalone D3/K2 route. The 20,000 IU tablets and Altapharma drops are retired. Essential Capsules still contribute vitamin D, so the total amount requires attention.",
  },
  {
    category: "Astaxanthin",
    status: "alternative",
    label: "Choose one source",
    productIds: ["sunday-astaxanthin-12-bioastin", "blueprint-advanced-antioxidants"],
    summary: "Sunday Natural BioAstin is the selected astaxanthin source. Advanced Antioxidants is retained only as a retired product and is not part of the current stack.",
  },
  {
    category: "Ashwagandha",
    status: "review",
    label: "Review overlap",
    productIds: ["blueprint-ashwagandha-rhodiola", "sunday-muscle-recover-ashwa-pro-complex"],
    summary: "Both contain ashwagandha, but their amounts, companion ingredients, and timing differ. They are not exact substitutes; combining them should be deliberate.",
  },
  {
    category: "Magnesium",
    status: "review",
    label: "Accepted overlap",
    productIds: [
      "sunday-magnesium-complex-11-ultra-xl",
      "sunday-magnesium-active-calm",
      "natural-elements-magnesium-bisglycinat",
      "sunday-muscle-recover-ashwa-pro-complex",
    ],
    summary: "Several current products contribute magnesium in different forms and amounts. Tilman accepts this overlap; Active Calm and Ashwa Pro are in the evening routine, while extra magnesium after sport remains conditional.",
  },
  {
    category: "Ubiquinol / CoQ10",
    status: "overlap",
    label: "Accepted overlap",
    productIds: ["blueprint-essential-capsules", "sunday-coenzyme-q10-kaneka-ubiquinol-200"],
    summary: "Essential Capsules contain ubiquinol and the standalone CoQ10 product adds a larger separate amount. Tilman accepts the cumulative sources.",
  },
  {
    category: "NADH",
    status: "overlap",
    label: "Accepted overlap",
    productIds: ["sunday-vitamin-b-complex-extra-forte", "sunday-nadh-50-d-ribose-galactose"],
    summary: "The B complex includes a smaller NADH amount and NADH 50 is the standalone source. Tilman accepts the cumulative sources.",
  },
  {
    category: "Vitamin C",
    status: "overlap",
    label: "Accepted overlap",
    productIds: ["sunday-liposomal-vitamin-c-zinc", "sunday-sunglow-luxe-collagen-c"],
    summary: "Vitamin C + Zinc and SunGlow Collagen + C both contribute vitamin C. Tilman accepts this overlap and keeps both products current.",
  },
  {
    category: "B vitamins",
    status: "overlap",
    label: "Accepted overlap",
    productIds: ["blueprint-essential-capsules", "sunday-vitamin-b-complex-extra-forte"],
    summary: "Essential Capsules and the standalone B complex both contribute B vitamins. Tilman accepts this overlap and uses the Sunday Natural product as the dedicated B-complex source.",
  },
  {
    category: "Probiotics",
    status: "overlap",
    label: "Additional probiotic source",
    productIds: ["omni-biotic-sr9", "blueprint-essential-capsules"],
    summary: "OMNi-BiOTiC SR-9 is the selected nine-strain probiotic product. Essential Capsules separately contribute Lactobacillus acidophilus, so both products count as probiotic sources rather than exact substitutes.",
  },
];

export function relationshipsForProduct(productId) {
  return supplementRelationshipGroups.filter((group) => group.productIds.includes(productId));
}
