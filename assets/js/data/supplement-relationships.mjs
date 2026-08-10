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
    status: "alternative",
    label: "Choose one route",
    productIds: [
      "sunday-vitamin-d3-k2-mk7-20000-iu-200mcg",
      "altapharma-d3-k2-drops",
    ],
    summary: "The high-dose periodic tablet and daily drops are alternative D3/K2 schedules, not a default combined stack. Essential Capsules and Advanced Antioxidants add further vitamin D or K. The non-default NORSAN liquid oil also contains vitamin D if used.",
  },
  {
    category: "Astaxanthin",
    status: "alternative",
    label: "Choose one source",
    productIds: ["sunday-astaxanthin-12-bioastin", "blueprint-advanced-antioxidants"],
    summary: "Both provide 12 mg astaxanthin per listed serving. Advanced Antioxidants is a broader formula, but taking both would duplicate astaxanthin.",
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
    label: "Choose a primary route",
    productIds: [
      "sunday-magnesium-complex-11-ultra-xl",
      "sunday-magnesium-active-calm",
      "natural-elements-magnesium-bisglycinat",
      "sunday-muscle-recover-ashwa-pro-complex",
      "blueprint-longevity-mix-blood-orange",
    ],
    summary: "Several products contribute magnesium in different forms and amounts. Active Calm and Ashwa Pro are the stated evening routine; extra magnesium after sport is conditional, not another daily default.",
  },
  {
    category: "L-theanine",
    status: "overlap",
    label: "Count both sources",
    productIds: ["blueprint-longevity-mix-blood-orange", "sunday-green-tea-extract-l-theanine-100mg"],
    summary: "Longevity Mix already contains L-theanine and the Sunday Natural product adds a separate 200 mg evening amount from two capsules. The split may be intentional, but both sources count toward the total.",
  },
  {
    category: "Ubiquinol / CoQ10",
    status: "overlap",
    label: "Count both sources",
    productIds: ["blueprint-essential-capsules", "sunday-coenzyme-q10-kaneka-ubiquinol-200"],
    summary: "Essential Capsules contain ubiquinol and the standalone CoQ10 product adds a larger separate amount. These are cumulative, not alternatives.",
  },
  {
    category: "NADH",
    status: "overlap",
    label: "Count both sources",
    productIds: ["sunday-vitamin-b-complex-extra-forte", "sunday-nadh-50-d-ribose-galactose"],
    summary: "The B complex includes a smaller NADH amount and NADH 50 is the standalone high-dose source. These are cumulative, not alternatives.",
  },
  {
    category: "Hyaluronic acid",
    status: "overlap",
    label: "Count both sources",
    productIds: ["blueprint-longevity-mix-blood-orange", "sunday-hyaluronic-acid-250-high-dose"],
    summary: "Longevity Mix contains sodium hyaluronate and the standalone product adds another hyaluronic-acid source.",
  },
  {
    category: "Blueprint core",
    status: "complementary",
    label: "Provider-designed pair",
    productIds: ["blueprint-essential-capsules", "blueprint-advanced-antioxidants"],
    summary: "Blueprint presents these products as complementary. That does not remove their separate overlaps with standalone astaxanthin, vitamin D, or vitamin K products.",
  },
];

export function relationshipsForProduct(productId) {
  return supplementRelationshipGroups.filter((group) => group.productIds.includes(productId));
}
