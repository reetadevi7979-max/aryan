type LovableAsset = {
  url: string;
};

const LOVABLE_ASSET_ORIGIN = "https://aryanfreelancer.lovable.app";

export function assetUrl(asset: LovableAsset) {
  if (asset.url.startsWith("http")) return asset.url;
  if (asset.url.startsWith("/__l5e/")) return `${LOVABLE_ASSET_ORIGIN}${asset.url}`;
  return asset.url;
}