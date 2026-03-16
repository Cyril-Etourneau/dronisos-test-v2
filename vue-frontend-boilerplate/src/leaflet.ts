import { Icon } from "leaflet";
/**
 * Patches Leaflet default marker icon URLs to ensure icons load correctly when bundled (e.g., with Webpack).
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
