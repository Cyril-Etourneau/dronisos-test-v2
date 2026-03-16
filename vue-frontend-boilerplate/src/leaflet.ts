import { Icon } from "leaflet";
/**
 * Patches Leaflet default marker icon URLs to ensure icons load correctly when bundled (e.g., with Webpack).
 *
 * Context:
 * - In some setups, Leaflet's default icon URL resolution fails at runtime, resulting in missing marker icons.
 * - This snippet removes the internal _getIconUrl resolver and merges explicit URLs pointing to the packaged assets.
 *
 * What it does:
 * - Deletes Icon.Default.prototype._getIconUrl (if present) so Leaflet uses the provided URLs.
 * - Merges options to set iconRetinaUrl, iconUrl, and shadowUrl to the assets bundled under leaflet/dist/images.
 *
 * Notes:
 * - This is a pragmatic fix for bundler resolution issues; prefer configuring asset loaders/aliases when possible.
 * - Safe to include once at app startup (before creating any Leaflet map/marker).
 *
 * Sources:
 * - Leaflet Default Icons and bundlers (Leaflet docs/issues)
 *   (Leaflet README — usage with bundlers: https://github.com/Leaflet/Leaflet#building-leaflet-from-source)
 */

type D = Icon.Default & {
    _getIconUrl?: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
