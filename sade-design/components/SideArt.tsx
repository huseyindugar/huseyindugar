/*
 * Decorative line-art fillers for the empty half of the alternating
 * left/right sections. Drawn in the same hand-sketched stroke style as
 * the hero illustration; hidden below 1300px where sections re-center.
 */

const arts = {
  // Hizmetler — rolled blueprint, pencil and a set square
  drafting: (
    <svg viewBox="0 0 300 260" aria-hidden="true">
      <ellipse cx="70" cy="120" rx="12" ry="34" />
      <line x1="70" y1="86" x2="210" y2="86" />
      <line x1="70" y1="154" x2="210" y2="154" />
      <path d="M210 86 A12 34 0 0 1 210 154" />
      <line x1="100" y1="105" x2="180" y2="105" />
      <line x1="100" y1="120" x2="165" y2="120" />
      <line x1="100" y1="135" x2="185" y2="135" />
      <circle className="em" cx="196" cy="98" r="2.4" />
      <line x1="120" y1="186" x2="222" y2="186" />
      <line x1="120" y1="194" x2="222" y2="194" />
      <line x1="120" y1="186" x2="120" y2="194" />
      <path d="M222 186 L234 190 L222 194" />
      <circle className="em" cx="236" cy="190" r="2" />
      <path d="M238 34 L292 34 L238 88 Z" />
      <path d="M248 44 L272 44 L248 68 Z" />
    </svg>
  ),
  // Güven — küçük iç mekân vinyeti: kemer, sarkıt lamba, koltuk, saksı
  vignette: (
    <svg viewBox="0 0 300 260" aria-hidden="true">
      <line x1="30" y1="210" x2="270" y2="210" />
      <path d="M100 210 L100 130 A40 40 0 0 1 180 130 L180 210" />
      <line x1="140" y1="96" x2="140" y2="128" />
      <path d="M126 140 A14 14 0 0 1 154 140" />
      <line x1="126" y1="140" x2="154" y2="140" />
      <circle className="em" cx="140" cy="147" r="2.6" />
      <path d="M42 210 L42 186 A14 8 0 0 1 70 186 L70 210" />
      <path d="M70 186 C75 172, 76 158, 74 148" />
      <path d="M45 172 C50 158, 60 158, 72 162" />
      <path d="M212 210 L214 190 L230 190 L232 210 Z" />
      <path d="M222 190 C219 178, 214 174, 210 170" />
      <path d="M222 190 C222 178, 222 172, 222 166" />
      <path d="M222 190 C225 180, 229 176, 232 173" />
      <ellipse cx="208" cy="166" rx="3" ry="5.5" transform="rotate(-28 208 166)" />
      <ellipse cx="222" cy="160" rx="3" ry="5.5" />
      <ellipse cx="234" cy="169" rx="3" ry="5.5" transform="rotate(26 234 169)" />
    </svg>
  ),
  // Hakkımızda — duvarda çerçeve, lambader ve koltuklu oturma köşesi
  desk: (
    <svg viewBox="0 0 300 260" aria-hidden="true">
      <line x1="40" y1="216" x2="260" y2="216" />
      <rect x="70" y="60" width="58" height="74" />
      <rect x="80" y="70" width="38" height="54" />
      <line x1="84" y1="112" x2="98" y2="92" />
      <line x1="98" y1="92" x2="112" y2="110" />
      <circle className="em" cx="104" cy="80" r="2.2" />
      <line x1="176" y1="216" x2="176" y2="112" />
      <path d="M160 112 A16 16 0 0 1 192 112" />
      <line x1="160" y1="112" x2="192" y2="112" />
      <circle className="em" cx="176" cy="120" r="2.6" />
      <path d="M216 216 L216 192 A14 8 0 0 1 244 192 L244 216" />
      <path d="M244 192 C249 178, 250 164, 248 154" />
      <path d="M219 176 C224 162, 234 162, 246 166" />
    </svg>
  ),
  // SSS — farklı yüksekliklerde üç sarkıt lamba
  lamps: (
    <svg viewBox="0 0 300 260" aria-hidden="true">
      <line x1="90" y1="24" x2="90" y2="118" />
      <path d="M74 132 A16 16 0 0 1 106 132" />
      <line x1="74" y1="132" x2="106" y2="132" />
      <circle className="em" cx="90" cy="140" r="2.6" />
      <line x1="158" y1="24" x2="158" y2="160" />
      <path d="M142 174 A16 16 0 0 1 174 174" />
      <line x1="142" y1="174" x2="174" y2="174" />
      <circle className="em" cx="158" cy="182" r="3.2" />
      <line x1="222" y1="24" x2="222" y2="88" />
      <path d="M206 102 A16 16 0 0 1 238 102" />
      <line x1="206" y1="102" x2="238" y2="102" />
      <circle className="em" cx="222" cy="110" r="2.6" />
    </svg>
  ),
  // İletişim — zarf, konuşma balonu ve kahve
  contact: (
    <svg viewBox="0 0 300 260" aria-hidden="true">
      <rect x="56" y="118" width="122" height="82" />
      <path d="M56 118 L117 166 L178 118" />
      <rect x="186" y="46" width="84" height="46" rx="10" />
      <path d="M206 92 L199 110 L222 92" />
      <circle className="em" cx="212" cy="69" r="2.4" />
      <circle className="em" cx="228" cy="69" r="2.4" />
      <circle className="em" cx="244" cy="69" r="2.4" />
      <path d="M212 170 L256 170 L256 188 A22 18 0 0 1 212 188 Z" />
      <path d="M256 174 A10 8 0 0 1 256 190" />
      <path d="M224 160 C222 154, 226 150, 224 144" />
      <path d="M240 160 C238 154, 242 150, 240 144" />
    </svg>
  ),
};

export default function SideArt({ variant }: { variant: keyof typeof arts }) {
  return (
    <div className="side-art" aria-hidden="true">
      {arts[variant]}
    </div>
  );
}
