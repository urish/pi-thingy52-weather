const Thingy = require('thingy52');
const doAsync = require('doasync');

function updateReading(value) {
  console.log('New data:', value);
}

function setupThingy(thingy) {
  thingy.on('batteryLevelChange', (batteryLevel) => updateReading({batteryLevel}));
  thingy.on('temperatureNotif', (temperature) => updateReading({ temperature }));
  thingy.on('pressureNotif', (pressure) => updateReading({ pressure }));
  thingy.on('humidityNotif', (humidity) => updateReading({ humidity }));
  thingy.on('gasNotif', ({ eco2, tvoc }) => updateReading({ eco2, tvoc }));
  thingy.on('colorNotif', ({ red, green, blue, clear }) =>
    updateReading({ colorRed: red, colorGreen: green, colorBlue: blue, colorClear: clear }),
  );

  const asyncThingy = doAsync(thingy);

  const promises = [
    // Set sensor sampling intervals
    asyncThingy.temperature_interval_set(1000),
    asyncThingy.pressure_interval_set(1000),
    asyncThingy.humidity_interval_set(1000),
    asyncThingy.color_interval_set(1000),
    asyncThingy.gas_mode_set(1),

    // Enable sensors
    asyncThingy.notifyBatteryLevel(),
    asyncThingy.temperature_enable(),
    asyncThingy.pressure_enable(),
    asyncThingy.humidity_enable(),
    asyncThingy.color_enable(),
    asyncThingy.gas_enable(),
  ];

  return Promise.all(promises);
}

async function onThingyFound(thingy) {
  try {
    console.log('Found Thingy: ' + thingy);
    await doAsync(thingy).connectAndSetUp();
    await setupThingy(thingy);
  } catch (err) {
    console.error('Thingy52 connection failed:', err);
  }
}

console.log('Thingy agent ready, looking for Thingys around');
Thingy.discover(onThingyFound);
