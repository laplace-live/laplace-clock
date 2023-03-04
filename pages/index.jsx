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
    { label: '左侧', value: 'flex-start' },
    { label: '居中', value: 'center' },
    { label: '右侧', value: 'flex-end' },
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
    { label: '跟随系统语言', value: 'default' },
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
    { label: '长（2022）', value: 'numeric' },
    { label: '短（22）', value: '2-digit' },
    { label: '不显示', value: 'hidden' },
  ];

  const dateMonthOptions = [
    { label: '长（September）', value: 'long' },
    { label: '短（Sep）', value: 'short' },
    { label: '窄（S）', value: 'narrow' },
    { label: '两位数字（09）', value: '2-digit' },
    { label: '数字（9）', value: 'numeric' },
  ];

  const dateDayOptions = [
    { label: '两位数字（01）', value: '2-digit' },
    { label: '数字（1）', value: 'numeric' },
  ];

  const dateWeekOptions = [
    { label: '长（Thursday）', value: 'long' },
    { label: '短（Thu）', value: 'short' },
    { label: '窄（T）', value: 'narrow' },
    { label: '不显示', value: 'hidden' },
  ];

  const swatches = [
    '#000000',
    '#25262b',
    '#868e96',
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

  const [time, setTime] = useState('00:00:00');
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
  const [tempBg, setTempBg] = useState(defaultTempBg);
  const [colorTint, setColorTint] = useState(defaultColorTint);
  const [linkTint, setLinkTint] = useState(defaultLinkTint);
  const [boldTint, setBoldTint] = useState(defaultBoldTint);
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

  function validateLocale(locale) {
    if (locale === 'default') {
      return undefined
    }
    if (localeOptions.some(e => e.value === locale)) {
      return locale
    }
    return undefined
  }

  function validateDateOptions(option, obj) {
    if (option === 'hidden') {
      return undefined
    }
    if (obj.some(e => e.value === option)) {
      return option
    }
    return undefined
  }

  function validatePosition(position) {
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
        <title>{`OBS 时钟${config.siteTitleSplitter}${config.siteTitle}`}</title>
        <meta name="description" content="用于 OBS 的纯前端实现的时钟挂件" />
      </Head>

      <main>
        <Link href={`https://${config.siteDomain}`}>拜访 LAPLACE 花店</Link>

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

        <h1>OBS 时钟前端版</h1>

        <h2>配置（点击标题展开）</h2>

        <details>
          <summary>数字时钟配置</summary>
          <p>字体上方颜色</p>
          <div className='picker-wrap'>
            <ColorInput value={color} onChange={setColor} format='hexa' swatches={[defaultColor, ...swatches]} styles={(theme) => (colorInputStyles)} />
            <label>
              <input
                type="checkbox"
                id="singleColor"
                onChange={e => setSingleColor(e.target.checked)} checked={singleColor}
              />
              无渐变
            </label>
          </div>

          {!singleColor && (
            <>
              <p>字体下方颜色</p>
              <div className='picker-wrap'>
                <ColorInput value={color2} onChange={setColor2} format='hexa' swatches={[defaultColor2, ...swatches]} styles={(theme) => (colorInputStyles)} />
              </div>

              <p>渐变角度 {gradientDeg}</p>
              <input type="range" className="custom-range" min="0" max="360" step="10"
                value={gradientDeg} onChange={e => setGradientDeg(e.target.value)} />
            </>
          )}

          <p>描边颜色（透明度设为 0 可隐藏描边，默认为不透明白色）</p>
          <div className='picker-wrap'>
            <ColorInput value={border} onChange={setBorder} format='hexa' swatches={[defaultBorder, '#ffffff00', ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>

          <p>描边粗细：{borderSize}</p>
          <input type="range" className="custom-range" min="-1" max="5"
            value={borderSize} onChange={e => setBorderSize(e.target.value)} />

          <p>
            文本对齐方式
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
              粗体
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="showSecond"
                onChange={e => setShowSecond(e.target.checked)} checked={showSecond}
              />
              显示秒数
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="is12h"
                onChange={e => setIs12h(e.target.checked)} checked={is12h}
              />
              使用 12 小时制
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                id="showDate"
                onChange={e => setShowDate(e.target.checked)} checked={showDate}
              />
              显示日期（开启后建议将「文本对齐方式」改为「居中」）
            </label>
          </p>

          {showDate && (
            <>
              <p>
                星期格式
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
                日（天）格式
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
                月份格式
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
                年份格式
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

              <p>日期字体大小 {dateSize}em</p>
              <input type="range" className="custom-range" min="1" max="5" step="0.02"
                value={dateSize} onChange={e => setDateSize(e.target.value)} />
            </>
          )}

          <p>
            日期格式覆盖
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
          <summary>传统时钟配置</summary>
          <p>文字颜色</p>
          <div className='picker-wrap'>
            <ColorInput value={anaText} onChange={setAnaText} format='hexa' swatches={[defaultAnaText, ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>

          <p>背景颜色</p>
          <div className='picker-wrap'>
            <ColorInput value={anaBg} onChange={setAnaBg} format='hexa' swatches={[defaultAnaBg, ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>
        </details> */}

        <details>
          <summary>全局设置</summary>

          <p>自定义本地字体（非 <code>var(--...</code> 开头的字体，本地<strong>必须</strong>存在该字体，方可生效）</p>
          <input id="fontString" type="text" placeholder="输入字体名称"
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

          <p>背景色（仅预览用，不会出现在 OBS）</p>
          <div className='picker-wrap'>
            <ColorInput value={tempBg} onChange={setTempBg} format='hexa' swatches={[defaultTempBg, ...swatches]} styles={(theme) => (colorInputStyles)} />
          </div>
        </details>

        <p>
          <Link href="/">
            <button>恢复默认值</button>
          </Link>
        </p>

        {/* <p>
          字形
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

        <h2>特性</h2>

        <ul>
          <li>无需安装任何 OBS 插件，背景在 OBS 中自动透明</li>
          <li>样式配置可通过 URL 一键分享</li>
          <li>时间与主播宿主时钟同步，误差小于 100ms</li>
          <li>样式可高度定制。默认为「<Link href="https://live.bilibili.com/25034104" rel='noopener noreferrer' target='_blank'>明前奶绿</Link>」直播间样式</li>
        </ul>

        <div>
          <h2>使用方法</h2>
          <ul>
            <li>使用上方拾色器和配置按钮调整好想要的样式</li>
            <li>调整好后，从浏览器地址栏复制这一大坨地址</li>
            <li>打开 OBS，新建<strong>浏览器</strong>图层，在 URL 中粘贴这一大坨地址。其他参数不动，点击 OK 保存</li>
            <li>在预览界面中，选定这个图层，按住 <strong>alt</strong> 或 <strong>option</strong> 键的同时<strong>鼠标左键</strong>拖动抓手，隐藏不相关元素</li>
          </ul>

          <details>
            <summary>🖼️ 查看图例</summary>
            <Image
              src="/clock-guide-full.gif" alt="Clock Guide"
              width={405}
              height={375}
              placeholder={'blur'}
              blurDataURL={'/clock-guide-full-loading.jpg'}
              loading={'lazy'}
            />
          </details>

          <h2>注意事项</h2>
          <ul>
            <li>如果想使用半透明的文字渐变，需要同时将文字描边设为透明，否则不生效</li>
            <li>非衬线字体请在 OBS 中裁剪的时候右侧需要留一定的空白，因为 1:11:01 的长度与 23:58:58 的长度不同，需考虑最长的情况</li>
          </ul>
        </div>

        <h2>更新日志</h2>

        <div>
          <ul>
            <li>Feb 27, 2023 - 内置部分自定义字体</li>
            <li>Feb 6, 2023 - 修复半透明渐变效果错误</li>
            <li>Feb 1, 2023 - 更新颜色组件，支持屏幕取色</li>
            <li>Nov 14, 2022 - 额外日期选项，支持自定义年、月、日、星期格式</li>
            <li>Oct 25, 2022 - 优化日期显示，折叠选项</li>
            <li>Oct 4, 2022 - 支持本地自定义字体，增加渐变、描边设置，修复输入框</li>
            <li>Oct 3, 2022 - 颜色可视化编辑、自定义样式</li>
            <li>Oct 2, 2022 - 第一版</li>
          </ul>
        </div>

        <h2>其他说明</h2>

        <ul>
          <li>出于部署便捷性以及隐私考虑，本站目前架设在境外，如访问困难可尝试通过代理访问</li>
          <li>本网站未使用第三方统计例如 Google Analytics、Cloudflare Analytics 等统计工具，不会将访问数据提供给第三方</li>
        </ul>

      </main>
    </div>
  )
}

export default About
