package app.common.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class Parkrecord {
    private Integer id;

    private Integer cid;

    private Integer number;

    private Date inTime;

    private Date outTime;

    private Integer pTime;

    private BigDecimal conusme;

    private Integer type;

    private String carNumber;

    private Integer isVip;
}