export const interRegular: FontName = {
  family: 'Inter',
  style: 'Regular',
};
export const interMedium: FontName = {
  family: 'Inter',
  style: 'Medium',
};

export async function loadFonts() {
  await Promise.all([
    figma.loadFontAsync(interRegular),
    figma.loadFontAsync(interMedium),
  ]);
}
