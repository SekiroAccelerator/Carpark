package app.common.pojo;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class Carpark {
    private Integer id;

    private String NAME;

    private String city;

    private String AREA;

    private String TYPE;

    private Integer total;

    private Integer rest;

    private BigDecimal price;

    private String lat;

    private String lng;
}