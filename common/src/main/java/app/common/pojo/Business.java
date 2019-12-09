package app.common.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class Business {
    private Integer id;

    private BigDecimal money;

    private Integer TYPE;

    private Integer STATUS;

    private Date bTime;

    private Integer uid;
}