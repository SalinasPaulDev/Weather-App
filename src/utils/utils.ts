export enum PartOfTheDay {
	DAY = 'day',
	NIGHT = 'night',
}
export const indentifyHour = (hour: string, live?: boolean) => {
	if (live) {
		const hourFormatted = hour.split(' ')
		const firstNumber = hourFormatted[0].split(':')[0]
		const isDay =
			(Number(firstNumber) > 6 && hourFormatted[1] === 'AM') ||
			(Number(firstNumber) < 8 && hourFormatted[1] === 'PM')

		return isDay ? 'bg-day' : 'bg-night'
	}
	if (
		hour === '6:00 AM' ||
		hour === '9:00 AM' ||
		hour === '12:00 PM' ||
		hour === '3:00 PM' ||
		hour === '6:00 PM'
	) {
		return 'bg-day'
	} else {
		return 'bg-night'
	}
}

export const getTimezoneByLocation = (timezone: number) => {
	const timestamp = Date.now()
	const timezoneOffsetInSeconds = timezone
	const dateWithTimezone = new Date(timestamp + timezoneOffsetInSeconds * 1000)

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
	})

	// Obtener la cadena formateada con la fecha y hora en el timezone deseado
	const formattedDate = dateFormatter.format(dateWithTimezone)

	// Mostrar la fecha y hora en tu página web
	return formattedDate
}
