export class TimeData
{
    constructor(hours = 0, minutes = 0, seconds = 0)
    {
        if (typeof hours !== 'number' || !Number.isInteger(hours))
        {
            throw new Error('Hours must be an integer');
        }
        if (typeof minutes !== 'number' || !Number.isInteger(minutes))
        {
            throw new Error('Minutes must be an integer');
        }
        if (typeof seconds !== 'number' || !Number.isInteger(seconds))
        {
            throw new Error('Seconds must be an integer');
        }

        this.hours = hours;
        if (minutes < 0 || minutes > 59)
        {
            throw new Error('Minutes must be between 0 and 59');
        }
        if (seconds < 0 || seconds > 59)
        {
            throw new Error('Seconds must be between 0 and 59');
        }
        this.minutes = minutes;
        this.seconds = seconds;
    }

    // 格式化輸出
    toString()
    {
        const absHours = Math.abs(this.hours);
        const sign = this.hours < 0 ? '-' : '';
        return `${sign}${absHours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
    }

    // 從字符串解析時間
    static fromString(timeStr)
    {
        const match = timeStr.match(/^(-)?(\d{2}):(\d{2}):(\d{2})$/);
        if (match)
        {
            const [, sign, hours, minutes, seconds] = match;
            const hoursNum = parseInt(hours) * (sign === '-' ? -1 : 1);
            return new TimeData(hoursNum, parseInt(minutes), parseInt(seconds));
        }
        throw new Error('Invalid time format');
    }

    static fromDatetime(datetimeStr)
    {
        // Validate input
        if (!datetimeStr || typeof datetimeStr !== 'string')
        {
            throw new Error('Datetime string must be provided');
        }

        // Validate format (YYYY-MM-DDTHHmmss)
        const formatRegex = /^\d{4}-\d{2}-\d{2}T\d{6}$/;
        if (!formatRegex.test(datetimeStr))
        {
            throw new Error('Invalid datetime format. Expected format: YYYY-MM-DDTHHmmss');
        }

        // Extract time part after 'T' (190000)
        const timePart = datetimeStr.split('T')[1];

        // Parse hours (19), minutes (00), seconds (00)
        const hours = parseInt(timePart.substring(0, 2));
        const minutes = parseInt(timePart.substring(2, 4));
        const seconds = parseInt(timePart.substring(4, 6));

        // Validate time values
        if (hours < 0 || hours > 23)
        {
            throw new Error('Hours must be between 0 and 23');
        }
        if (minutes < 0 || minutes > 59)
        {
            throw new Error('Minutes must be between 0 and 59');
        }
        if (seconds < 0 || seconds > 59)
        {
            throw new Error('Seconds must be between 0 and 59');
        }

        return new TimeData(hours, minutes, seconds);
    }

    compareTo(otherTimeData)
    {
        if (!(otherTimeData instanceof TimeData))
        {
            throw new Error('Comparison must be with another TimeData object');
        }

        if (this.hours !== otherTimeData.hours)
        {
            return this.hours > otherTimeData.hours;
        }

        if (this.minutes !== otherTimeData.minutes)
        {
            return this.minutes > otherTimeData.minutes;
        }

        return this.seconds > otherTimeData.seconds;
    }

}

class RealtimeServices
{
    static instance = null;

    static getInstance()
    {
        if (!RealtimeServices.instance)
        {
            RealtimeServices.instance = new RealtimeServices();
        }
        return RealtimeServices.instance;
    }

    constructor()
    {
        // 確保不能直接 new RealtimeServices()
        if (RealtimeServices.instance)
        {
            return RealtimeServices.instance;
        }
        this.currentRealtime = new TimeData();
        this.startRealtime = new TimeData();
        this.endRealtime = new TimeData();
        RealtimeServices.instance = this;
    }

    // Current Realtime
    getCurrentRealtime()
    {
        return this.currentRealtime;
    }

    setCurrentRealtime(time)
    {
        this.currentRealtime = time;
    }

    // Start Realtime
    getStartRealtime()
    {
        return this.startRealtime;
    }

    setStartRealtime(time)
    {
        this.startRealtime = time;
    }

    // End Realtime
    getEndRealtime()
    {
        return this.endRealtime;
    }

    setEndRealtime(time)
    {
        this.endRealtime = time;
    }

    setRealtime(startTime, endTime)
    {
        if (!(startTime instanceof TimeData))
        {
            throw new Error('startTime must be with TimeData object');
        }
        if (!(endTime instanceof TimeData))
        {
            throw new Error('endTime must be with TimeData object');
        }
        const isStartTimeLater = startTime.compareTo(endTime);
        if (isStartTimeLater)
        {
            endTime.hours += 24;
        }

        this.setStartRealtime(startTime);
        this.setEndRealtime(endTime);

    }
    
}

export const realtimeServices = RealtimeServices.getInstance();


