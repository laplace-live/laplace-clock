import { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import {
  ZCOOL_XiaoWei,
  Playfair_Display,
  Orbitron,
  Paytone_One,
  Press_Start_2P,
  Monoton,
  Bangers,
  Libre_Barcode_39_Extended,
  Lacquer,
} from 'next/font/google'

import useLocalStorageState from 'use-local-storage-state'
import { useQueryParam, NumberParam, StringParam, BooleanParam, withDefault } from 'use-query-params';
import { ColorInput } from '@mantine/core';
import { colord } from "colord";
// import Clock from 'react-clock'
import { config } from '@/data/config.js'

import styles from '../styles/Clock.module.scss'
// import 'react-clock/dist/Clock.css';

const isDesktop = process.env.DESKTOP === 'true'

const fontZCOOLXiaoWei = ZCOOL_XiaoWei({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-zcool-xiaowei',
})

const fontPlayfairDisplay = Playfair_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-playfair',
})

const fontOrbitron = Orbitron({
  weight: ['800'],
  subsets: ['latin'],
  variable: '--clock-font-orbitron',
})

const fontPaytoneOne = Paytone_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-paytone-one',
})

const fontPressStart2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-press-start-2p',
})

const fontMonoton = Monoton({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-monoton',
})

const fontBangers = Bangers({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-bangers',
})

const fontLibreBarcode39Extended = Libre_Barcode_39_Extended({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-libre-barcode-39-extended',
})

const fontLacquer = Lacquer({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--clock-font-lacquer',
})

function About() {
  const wrapperRef = useRef(null);
  // const router = useRouter();

  const positionOptions = [
    { label: '??????', value: 'flex-start' },
    { label: '??????', value: 'center' },
    { label: '??????', value: 'flex-end' },
  ];

  const fontsOptions = [
    { value: 'var(--clock-font-zcool-xiaowei)' },
    { value: 'var(--clock-font-playfair)' },
    { value: 'var(--clock-font-orbitron)' },
    { value: 'var(--clock-font-paytone-one)' },
    { value: 'var(--clock-font-press-start-2p)' },
    { value: 'var(--clock-font-monoton)' },
    { value: 'var(--clock-font-bangers)' },
    { value: 'var(--clock-font-libre-barcode-39-extended)' },
    { value: 'var(--clock-font-lacquer)' },
    { value: 'Arial' },
    { value: 'Candara' },
    { value: 'Comic Sans MS' },
    { value: 'Consolas' },
    { value: 'Gabriola' },
    { value: 'Georgia' },
    { value: 'Helvetica Neue' },
    { value: 'Heiti SC' },
    { value: 'Heiti TC' },
    { value: 'Hiragino Mincho ProN' },
    { value: 'Hiragino Sans GB' },
    { value: 'Microsoft JhengHei' },
    { value: 'Microsoft Sans Serif' },
    { value: 'Microsoft YaHei' },
    { value: 'Noto Sans SC' },
    { value: 'Noto Sans TC' },
    { value: 'Segoe UI' },
  ];

  const localeOptions = [
    { label: '??????????????????', value: 'default' },
    { label: 'zh-CN', value: 'zh-CN' },
    { label: 'zh-TW', value: 'zh-TW' },
    { label: 'en', value: 'en' },
    { label: 'ja', value: 'ja' },
    { label: 'th', value: 'th' },
    { label: 'de', value: 'de' },
    { label: 'fr', value: 'fr' },
    { label: 'no', value: 'no' },
    { label: 'it', value: 'it' },
  ];

  const dateYearOptions = [
    { label: '??????2022???', value: 'numeric' },
    { label: '??????22???', value: '2-digit' },
    { label: '?????????', value: 'hidden' },
  ];

  const dateMonthOptions = [
    { label: '??????September???', value: 'long' },
    { label: '??????Sep???', value: 'short' },
    { label: '??????S???', value: 'narrow' },
    { label: '???????????????09???', value: '2-digit' },
    { label: '?????????9???', value: 'numeric' },
  ];

  const dateDayOptions = [
    { label: '???????????????01???', value: '2-digit' },
    { label: '?????????1???', value: 'numeric' },
  ];

  const dateWeekOptions = [
    { label: '??????Thursday???', value: 'long' },
    { label: '??????Thu???', value: 'short' },
    { label: '??????T???', value: 'narrow' },
    { label: '?????????', value: 'hidden' },
  ];

  const swatches = [
    '#000000',
    '#25262b',
    '#868e96',
    '#ff00ff',
    '#00ff00',
    '#0000ff',
    '#fa5252',
    '#e64980',
    '#be4bdb',
    '#7950f2',
    '#4c6ef5',
    '#228be6',
    '#15aabf',
    '#12b886',
    '#40c057',
    '#82c91e',
    '#fab005',
    '#fd7e14',
  ]

  const defaultColor = '#22542b'
  const defaultColor2 = '#bad5b8'
  const defaultAnaText = '#7da489'
  const defaultAnaBg = '#e8fffa'
  const defaultBorder = '#ffffff'
  const defaultTempBg = '#ffffff00'
  const defaultColorTint = '#000'
  const defaultLinkTint = '#31783e'
  const defaultBoldTint = '#000'
  const defaultFontString = 'var(--clock-font-zcool-xiaowei)'

  const [time, setTime] = useState<Date | '00:00:00'>('00:00:00');
  const [tempBg, setTempBg] = useState(defaultTempBg);
  const [colorTint, setColorTint] = useState(defaultColorTint);
  const [linkTint, setLinkTint] = useState(defaultLinkTint);
  const [boldTint, setBoldTint] = useState(defaultBoldTint);

  // const [color, setColor] = useQueryParam('color', withDefault(StringParam, defaultColor));
  // const [color, setColor] = useLocalStorageState(`clockColor`, { defaultValue: defaultColor })

  const [color, setColor] = useQueryParam('color', withDefault(StringParam, defaultColor))
  const [color2, setColor2] = useQueryParam('color2', withDefault(StringParam, defaultColor2));
  const [anaText, setAnaText] = useQueryParam('anaText', withDefault(StringParam, defaultAnaText));
  const [anaBg, setAnaBg] = useQueryParam('anaBg', withDefault(StringParam, defaultAnaBg));
  const [border, setBorder] = useQueryParam('border', withDefault(StringParam, defaultBorder));
  const [borderSize, setBorderSize] = useQueryParam('borderSize', withDefault(NumberParam, 1));
  const [gradientDeg, setGradientDeg] = useQueryParam('gradientDeg', withDefault(NumberParam, 180));
  const [dateSize, setDateSize] = useQueryParam('dateSize', withDefault(NumberParam, 3));
  const [is12h, setIs12h] = useQueryParam('12h', withDefault(BooleanParam, false));
  const [showDate, setShowDate] = useQueryParam('showDate', withDefault(BooleanParam, false));
  const [locale, setLocale] = useQueryParam('locale', withDefault(StringParam, 'default'));
  const [fontString, setFontString] = useQueryParam('fontString', withDefault(StringParam, defaultFontString));
  const [position, setPosition] = useQueryParam('position', withDefault(StringParam, ''));
  const [singleColor, setSingleColor] = useQueryParam('singleColor', withDefault(BooleanParam, false));
  const [showSecond, setShowSecond] = useQueryParam('showSecond', withDefault(BooleanParam, true));
  const [isBold, setIsBold] = useQueryParam('isBold', withDefault(BooleanParam, true));
  const [yearFormat, setYearFormat] = useQueryParam('yearFormat', withDefault(StringParam, 'numeric'));
  const [monthFormat, setMonthFormat] = useQueryParam('monthFormat', withDefault(StringParam, '2-digit'));
  const [dayFormat, setDayFormat] = useQueryParam('dayFormat', withDefault(StringParam, '2-digit'));
  const [weekFormat, setWeekFormat] = useQueryParam('weekFormat', withDefault(StringParam, 'short'));

  const colorInputStyles = {
    input: {
      color: colorTint,
      borderColor: colorTint,
      backgroundColor: tempBg,

      ':focus': {
        borderColor: colorTint,
      },
    },
    rightSection: {

      '> button': {
        color: colorTint,

        ':hover': {
          backgroundColor: colord(colorTint).alpha(.1).toHex(),
        }
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      let currentTime = new Date();
      currentTime = new Date(currentTime.getTime());
      setTime(currentTime);
    }, 100);

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const isDarkBg = tempBg && colord(tempBg).isDark()
    const colorComputed = isDarkBg
      ? `#fff`
      : `#000`
    const linkComputed = isDarkBg
      ? colord(color).lighten(.1).toHex()
      : colord(color).toHex()
    const boldComputed = isDarkBg
      ? colord(color).rotate(-30).lighten(.1).toHex()
      : colord(color).rotate(-30).toHex()

    setColorTint(colorComputed)
    setLinkTint(linkComputed)
    setBoldTint(boldComputed)
  }, [color, tempBg])

  function validateLocale(locale: Intl.LocalesArgument | 'default') {
    if (locale === 'default') {
      return undefined
    }
    if (localeOptions.some(e => e.value === locale)) {
      return locale
    }
    return undefined
  }

  function validateDateOptions(option: any, obj: any) {
    if (option === 'hidden') {
      return undefined
    }
    if (obj.some((e: any) => e.value === option)) {
      return option
    }
    return undefined
  }

  function validatePosition(position: string) {
    if (positionOptions.some(e => e.value === position)) {
      return position
    }
    return `flex-start`
  }

  const timeOutput = time.toLocaleString(validateLocale(locale), {
    hour: 'numeric',
    minute: 'numeric',
    second: showSecond ? 'numeric' : undefined,
    hour12: is12h,
  })

  const dateOutput = time.toLocaleString(validateLocale(locale), {
    year: validateDateOptions(yearFormat, dateYearOptions),
    month: validateDateOptions(monthFormat, dateMonthOptions),
    day: validateDateOptions(dayFormat, dateDayOptions),
    weekday: validateDateOptions(weekFormat, dateWeekOptions),
    // timeZone: "America/New_York",
  })

  return (
    <div ref={wrapperRef} className={`
      ${styles.container}
      ${fontZCOOLXiaoWei.variable}
      ${fontPlayfairDisplay.variable}
      ${fontOrbitron.variable}
      ${fontPaytoneOne.variable}
      ${fontPressStart2P.variable}
      ${fontMonoton.variable}
      ${fontBangers.variable}
      ${fontLibreBarcode39Extended.variable}
      ${fontLacquer.variable}
    `}>
      <style jsx global>{`
        html,
        body {
          color: ${colorTint};
          background: ${tempBg};
        }

        main {
          position: relative;
        }

        a {
          color: ${linkTint};
        }

        strong {
          color: ${boldTint};
        }
      `}</style>

      <style jsx>{`
        .picker-wrap {
          display: flex;
          align-items: center;
          gap: .5rem;
          margin: 1em 0;
        }

        .title-wrap {
          position: sticky;
          top: 0;
          z-index: 100;
          margin: 62px 0;
        }

        .title-content {
          display: grid;
          gap: 0 1em;
          justify-items: ${validatePosition(position)};
        }

        .title {
          position: relative;
          font-size: 85px;
          font-weight: ${isBold ? `bold` : `normal`};
          font-family: ${fontString ? fontString : `var(--fontstack-custom)`};
          color: ${color};
          background-image: linear-gradient(${gradientDeg}deg, ${color}, ${singleColor ? color : color2});
          background-size: 100%;
          background-repeat: repeat;

          padding: 0;

          /* padding fix for specific font */
          padding-right: ${fontString === `var(--clock-font-bangers)` ? `1rem` : 0};
          margin: 0;
          /* margin: 1.36rem 0; */

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          background-clip: text;
          text-fill-color: transparent;
        }

        .title.date {
          font-size: ${dateSize}rem;
        }

        .title::after {
          background: none;
          position: absolute;
          left: 0;
          top: 0;
          padding-right: ${fontString === `var(--clock-font-bangers)` ? `1rem` : 0};
          content: attr(data-text);
          text-shadow: -${borderSize}px -${borderSize}px 0 ${border},
            0   -${borderSize}px 0 ${border},
            ${borderSize}px -${borderSize}px 0 ${border},
            ${borderSize}px  0   0 ${border},
            ${borderSize}px  ${borderSize}px 0 ${border},
            0    ${borderSize}px 0 ${border},
            -${borderSize}px  ${borderSize}px 0 ${border},
            -${borderSize}px  0   0 ${border};
          z-index: -1;
        }

      `}</style>

      <style>{`
        .react-clock__face {
          color: ${anaText};
          background-color: ${anaBg};
          border-color: ${anaText};
        }

        .react-clock__hand__body,
        .react-clock__mark__body {
          background-color: ${anaText};
        }

        .react-clock__mark__number {
          font-family: ${fontString ? fontString : `var(--fontstack-custom)`};
          font-size: 36px;
        }

        .react-clock__face {
          border-width: 2px;
        }
      `}</style>

      <Head>
        <title>{`OBS ??????${config.siteTitleSplitter}${config.siteTitle}`}</title>
        <meta name="description" content="?????? OBS ?????????????????????????????????" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Link href={`https://${config.siteDomain}`}>?????? LAPLACE ??????</Link>

        <div className='title-wrap'>
          <div className='title-content'>
            <h1 className="title" data-text={timeOutput}>
              {timeOutput}
            </h1>
            {showDate && (
              <h1 className="title date" data-text={dateOutput}>
                {dateOutput}
              </h1>
            )}
          </div>
        </div>

        {/* <div>
          <Clock
            value={time}
            renderNumbers={true}
            size={250}
            hourHandWidth={12}
            minuteHandLength={75}
            minuteHandWidth={6}
            secondHandWidth={3}
          />
        </div> */}

        <h1>OBS ???????????????</h1>

        <h2>??????????????????????????????</h2>

        <details>
          <summary>??????????????????</summary>
          <p>??????????????????</p>
          <div className='picker-wrap'>
            <ColorInput value={color} onChange={setColor} format='hexa' swatches={[defaultColor, ...swatches]} styles={(theme) => (colorInputStyles)} />
            <label>
              <input
                type="checkbox"
                id="singleColor"
                onChange={e => setSingleColor(e.target.checked)} checked={singleColor}
              />
              ?????????
            </label>
          </div>

          {!singleColor && (
            <>
              <p>??????????????????</p>
              <div className='picker-wrap'>
                <ColorInput value={color2} onChange={setColor2} format='hexa' swatches={[defaultColor2, ...swatches]} styles={(theme) => (colorInputStyles)} />
              </div>

              <p>???????????? {gradientDeg}</p>
              <input type="range" className="custom-range" min="0" max="360" step="10"
                value={gradientDeg} onChange={e => setGradientDeg(Number(e.target.value))} />
            </>
          )}

          <p>?????????????????????????????? 0 ?????????????????????????????????????????????</p>
          <div className='picker-wrap'>
            <ColorInput value={border} onChange={setBorder} format='hexa' swatches={[defaultBorder, '#ffffff00', ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>

          <p>???????????????{borderSize}</p>
          <input type="range" className="custom-range" min="-1" max="5"
            value={borderSize} onChange={e => setBorderSize(Number(e.target.value))} />

          <p>
            ??????????????????
          </p>
          <p>
            <select
              value={position}
              onChange={e => setPosition(e.target.value)}
            >
              {positionOptions.map((item, idx) => (
                <option value={item.value} key={idx}>
                  {item.label}
                </option>
              ))}
            </select>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="isBold"
                onChange={e => setIsBold(e.target.checked)} checked={isBold}
              />
              ??????
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="showSecond"
                onChange={e => setShowSecond(e.target.checked)} checked={showSecond}
              />
              ????????????
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="is12h"
                onChange={e => setIs12h(e.target.checked)} checked={is12h}
              />
              ?????? 12 ?????????
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="showDate"
                onChange={e => setShowDate(e.target.checked)} checked={showDate}
              />
              ??????????????????????????????????????????????????????????????????????????????
            </label>
          </p>

          {showDate && (
            <>
              <p>
                ????????????
              </p>
              <p>
                <select
                  value={weekFormat}
                  onChange={e => setWeekFormat(e.target.value)}
                >
                  {dateWeekOptions.map((item, idx) => (
                    <option value={item.value} key={idx}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </p>

              <p>
                ??????????????????
              </p>
              <p>
                <select
                  value={dayFormat}
                  onChange={e => setDayFormat(e.target.value)}
                >
                  {dateDayOptions.map((item, idx) => (
                    <option value={item.value} key={idx}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </p>

              <p>
                ????????????
              </p>
              <p>
                <select
                  value={monthFormat}
                  onChange={e => setMonthFormat(e.target.value)}
                >
                  {dateMonthOptions.map((item, idx) => (
                    <option value={item.value} key={idx}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </p>

              <p>
                ????????????
              </p>
              <p>
                <select
                  value={yearFormat}
                  onChange={e => setYearFormat(e.target.value)}
                >
                  {dateYearOptions.map((item, idx) => (
                    <option value={item.value} key={idx}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </p>

              <p>?????????????????? {dateSize}em</p>
              <input type="range" className="custom-range" min="1" max="5" step="0.02"
                value={dateSize} onChange={e => setDateSize(Number(e.target.value))} />
            </>
          )}

          <p>
            ??????????????????
          </p>
          <p>
            <select
              value={locale}
              onChange={e => setLocale(e.target.value)}
            >
              {localeOptions.map((item, idx) => (
                <option value={item.value} key={idx}>
                  {item.label}
                </option>
              ))}
            </select>
          </p>
        </details>

        {/* <details>
          <summary>??????????????????</summary>
          <p>????????????</p>
          <div className='picker-wrap'>
            <ColorInput value={anaText} onChange={setAnaText} format='hexa' swatches={[defaultAnaText, ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>

          <p>????????????</p>
          <div className='picker-wrap'>
            <ColorInput value={anaBg} onChange={setAnaBg} format='hexa' swatches={[defaultAnaBg, ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>
        </details> */}

        <details>
          <summary>????????????</summary>

          <p>
            <label>
              <input
                type="checkbox"
                id="isBold"
                onChange={e => setIsBold(e.target.checked)} checked={isBold}
              />
              ??????
            </label>
          </p>

          <p>??????????????????????????? <code>var(--...</code> ????????????????????????<strong>??????</strong>?????????????????????????????????</p>
          <p>?????????????????? <a href="https://fonts.google.com/" rel='noopener noreferrer' target='_blank'>Google Fonts</a> ?????????????????????????????????????????? <a href={`mailto:${config.siteEmail}`}>{config.siteEmail}</a> ??????</p>
          <input id="fontString" type="text" placeholder="??????????????????"
            value={fontString} onChange={e => setFontString(e.target.value)} />{' '}

          <select
            value={fontString}
            onChange={e => setFontString(e.target.value)}
          >
            {fontsOptions.map((item, idx) => (
              <option value={item.value} key={idx}>
                {item.value}
              </option>
            ))}
          </select>

          <p>?????????????????????????????????????????? OBS???</p>
          <div className='picker-wrap'>
            <ColorInput value={tempBg} onChange={setTempBg} format='hexa' swatches={[defaultTempBg, ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>
        </details>

        <p>
          <Link href="/">
            <button>???????????????</button>
          </Link>
        </p>

        {/* <p>
          ??????
          <form>
            <select
              value={font}
              onChange={e => setFont(e.target.value)}
            >
              {fontOptions.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </form>
        </p> */}

        <h2>??????</h2>

        <ul>
          <li>?????????????????? OBS ?????????????????? OBS ???????????????</li>
          <li>????????????????????? URL ????????????</li>
          <li>???????????????????????????????????????????????? 100ms</li>
          <li>????????????????????????????????????<Link href="https://live.bilibili.com/25034104" rel='noopener noreferrer' target='_blank'>????????????</Link>??????????????????</li>
        </ul>

        <div>
          <h2>????????????</h2>
          <ul>
            <li>????????????????????????????????????????????????????????????</li>
            <li>????????????????????????????????????????????????????????????</li>
            <li>?????? OBS?????????<strong>?????????</strong>???????????? URL ????????????????????????????????????????????????????????? OK ??????</li>
            <li>???????????????????????????????????????????????? <strong>alt</strong> ??? <strong>option</strong> ????????????<strong>????????????</strong>????????????????????????????????????</li>
          </ul>

          <details>
            <summary>??????? ????????????</summary>
            <Image
              src="/clock-guide-full.gif" alt="Clock Guide"
              width={405}
              height={375}
              placeholder={'blur'}
              blurDataURL={'/clock-guide-full-loading.jpg'}
              loading={'lazy'}
            />
          </details>

          <h2>????????????</h2>
          <ul>
            <li>???????????????????????????????????????????????????????????????????????????????????????????????????</li>
            <li>????????????????????? OBS ????????????????????????????????????????????????????????? 1:11:01 ???????????? 23:58:58 ??????????????????????????????????????????</li>
          </ul>
        </div>

        <h2>????????????</h2>

        <div>
          <ul>
            <li>Feb 27, 2023 - ???????????????????????????</li>
            <li>Feb 6, 2023 - ?????????????????????????????????</li>
            <li>Feb 1, 2023 - ???????????????????????????????????????</li>
            <li>Nov 14, 2022 - ??????????????????????????????????????????????????????????????????</li>
            <li>Oct 25, 2022 - ?????????????????????????????????</li>
            <li>Oct 4, 2022 - ???????????????????????????????????????????????????????????????????????????</li>
            <li>Oct 3, 2022 - ???????????????????????????????????????</li>
            <li>Oct 2, 2022 - ?????????</li>
          </ul>
        </div>

        <h2>????????????</h2>

        <ul>
          <li>??????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
          <li>??????????????????????????????????????? Google Analytics???Cloudflare Analytics ?????????????????????????????????????????????????????????</li>
        </ul>

        <p>Brought to you by laplace.live</p>

      </main>
    </div>
  )
}

export default About
