import {
  ShieldCheck, Award, CheckCircle2, Clock, Sparkles, Compass, CalendarCheck, Palette, Feather, Layers,
  Home, CookingPot, Briefcase, Key, MessagesSquare, Ruler, Hammer, CheckCheck, Star, Wrench, Gem,
  Lamp, Sofa, BedDouble, Building2, Truck, Leaf, Heart, Lightbulb, PenTool, Users, MapPin,
} from 'lucide-react';

/** Icon registry shared by the website and the admin icon picker. */
export const ICONS = {
  ShieldCheck, Award, CheckCircle2, Clock, Sparkles, Compass, CalendarCheck, Palette, Feather, Layers,
  Home, CookingPot, Briefcase, Key, MessagesSquare, Ruler, Hammer, CheckCheck, Star, Wrench, Gem,
  Lamp, Sofa, BedDouble, Building2, Truck, Leaf, Heart, Lightbulb, PenTool, Users, MapPin,
};

export const ICON_NAMES = Object.keys(ICONS);

export const getIcon = (name, fallback = Sparkles) => ICONS[name] || fallback;
