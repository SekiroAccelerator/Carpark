package app.common.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class Bill {
    private Integer id;

    private Integer cid;

    private Date bTime;

    private String type;

    private BigDecimal money;

    private String remark;
}